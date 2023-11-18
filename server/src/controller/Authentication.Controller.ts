import { Request, Response } from "express";
import mysql from "mysql2";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import decryptor from "../tools/decryptor.tool.js"; // Must include `.js` extension in order to work properly!
import authenticationModel from "../model/authentication.model.js"; // Must include `.js` extension in order to work properly!

class authenticationController
{
      model: authenticationModel;

      constructor()
      {
            this.model = new authenticationModel();
            // Class methods lose their original context when used as callbacks, in this case this.model is undefined, a way to solve this is to bind the methods in the class constructor
            this.login = this.login.bind(this);
            this.isLoggedIn = this.isLoggedIn.bind(this);
            this.logout = this.logout.bind(this);
            this.newPassword = this.newPassword.bind(this);
            this.validation = this.validation.bind(this);
      }

      login(req: Request, res: Response): void
      {
            const data: any = decryptor(req.body.data);
            let isOk: boolean = true;
            if (!data.params.username)
            {
                  isOk = false;
                  res
                        .status(400)
                        .send({ message: "Username field is empty or null or not found!" });
            }
            if (!data.params.password)
            {
                  isOk = false;
                  res
                        .status(400)
                        .send({ message: "Password field is empty or null or not found!" });
            }
            if (!isOk) return;
            this.model.login(
                  data.params.username,
                  data.params.password,
                  (result, err) =>
                  {
                        if (err)
                        {
                              console.log(err);
                              res.status(500).send({ message: "Server internal error!" });
                        } else
                        {
                              if (result && result.length)
                              {
                                    req.session.username = result[0].username;
                                    req.session.save(() =>
                                    {
                                          // Session saved
                                          res
                                                .status(200)
                                                .send({ isEncrypted: false, data: { found: true } });
                                    });
                              } else
                                    res
                                          .status(200)
                                          .send({ isEncrypted: false, data: { found: false } });
                        }
                  }
            );
      }

      isLoggedIn(req: Request, res: Response): void
      {
            if (!req.session || !req.session.username)
            {
                  res.status(200).send({ isEncrypted: false, data: { found: false } });
                  return;
            } else
            {
                  this.model.verifyUser(req.session.username, (result, err) =>
                  {
                        if (err)
                        {
                              console.log(err);
                              res.status(500).send({ message: "Server internal error!" });
                        } else
                        {
                              if (result && result.length)
                                    res.status(200).send({ isEncrypted: false, data: { found: true } });
                              else
                                    res
                                          .status(401)
                                          .send({ message: "User is not found or something is wrong!" });
                        }
                  });
            }
      }

      logout(req: Request, res: Response): void
      {
            if (!req.session || !req.session.username)
            {
                  res.status(400).send({ message: "Session cookie not present!" });
                  return;
            } else
            {
                  // Get the current file path
                  const currentFilePath: string = fileURLToPath(import.meta.url);

                  // Get the current directory by resolving the file path
                  const currentDirectory: string = path.dirname(currentFilePath);

                  // Get the parrent directory
                  const parentDirectory: string = path.resolve(currentDirectory, "..");

                  // Specify the session file directory
                  const sessionDir: string = path.join(parentDirectory, "data", "sessions");

                  // Define the session ID or session file name for which you want to delete its additional files
                  const sessionID: string = req.sessionID;

                  // Regular expression pattern for matching the additional session files
                  const additionalFilesPattern: RegExp = new RegExp(
                        `^${ sessionID }.json.\\d+$`
                  );
                  req.session.destroy((err) =>
                  {
                        if (err)
                        {
                              console.log(err);
                              console.error("Error destroying session:", err);
                        } else
                        {
                              res.clearCookie("connect.sid");
                              res.status(200).send({ message: "Logged out successfully!" });

                              // Get a list of files in the session directory
                              fs.readdir(sessionDir, (err, files) =>
                              {
                                    if (err)
                                    {
                                          console.error("Error reading session directory:", err);
                                          return;
                                    }

                                    // Filter the list to include only the additional session files for the specified session
                                    const additionalFiles: string[] = files.filter((file) =>
                                          additionalFilesPattern.test(file)
                                    );

                                    // Delete each additional session file
                                    additionalFiles.forEach((file) =>
                                    {
                                          const filePath = `${ sessionDir }/${ file }`;
                                          fs.unlink(filePath, (err) =>
                                          {
                                                if (err)
                                                {
                                                      console.error(
                                                            "Error deleting additional session file:",
                                                            filePath,
                                                            err
                                                      );
                                                } else
                                                {
                                                      console.log("Additional session file deleted:", filePath);
                                                }
                                          });
                                    });
                              });
                        }
                  });
            }
      }

      validation(req: Request, res: Response): void
      {
            const username = req.query.username;
            if (!username)
            {
                  res
                        .status(400)
                        .send({ message: "Username field is empty or null or not found!" });
                  return;
            }
            if (typeof username === "string")
                  this.model.verifyUser(username, (result, err) =>
                  {
                        if (err)
                        {
                              console.log(err);
                              res.status(500).send({ message: "Server internal error!" });
                        } else
                        {
                              if (result && result.length)
                                    res.status(200).send({ isEncrypted: false, data: { found: true } });
                              else
                                    res
                                          .status(200)
                                          .send({ isEncrypted: false, data: { found: false } });
                        }
                  });
      }

      newPassword(req: Request, res: Response): void
      {
            const data: any = decryptor(req.body.data);
            let isOk: boolean = true;
            if (!data.params.username)
            {
                  isOk = false;
                  res
                        .status(400)
                        .send({ message: "Username field is empty or null or not found!" });
            }
            if (!data.params.password)
            {
                  isOk = false;
                  res
                        .status(400)
                        .send({ message: "Password field is empty or null or not found!" });
            }
            if (!isOk) return;
            this.model.recovery(
                  data.params.username,
                  data.params.password,
                  (result, err) =>
                  {
                        if (err)
                        {
                              console.log(err);
                              res.status(500).send({ message: "Server internal error!" });
                        } else res.status(200).send({ message: "Password changed!" });
                  }
            );
      }
}

export default authenticationController;
