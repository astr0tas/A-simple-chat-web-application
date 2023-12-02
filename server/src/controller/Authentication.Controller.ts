import { NextFunction, Request, Response } from "express";
import mysql from "mysql2";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import decryptor from "../tools/decryptor.tool.js"; // Must include `.js` extension in order to work properly!
import authenticationModel from "../model/authentication.model.js"; // Must include `.js` extension in order to work properly!
import RequestError from "../tools/requestError.tool.js"; // Must include `.js` extension in order to work properly!

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

      login(req: Request, res: Response, next: NextFunction): void
      {
            try
            {
                  const data: any = decryptor(req.body.data);
                  if (!data.params.username)
                        throw new RequestError(400, "Username field is empty or null or not found!", "Missing property");
                  if (!data.params.password)
                        throw new RequestError(400, "Password field is empty or null or not found!", "Missing property");
                  this.model.login(
                        data.params.username,
                        data.params.password,
                        (result, err) =>
                        {
                              if (!err)
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
                              else
                                    next(new RequestError(500, `${ err.message } of query \`${ err.sql }\``, "MySQL query error"));
                        }
                  );
            }
            catch (err)
            {
                  next(err);
            }
      }

      isLoggedIn(req: Request, res: Response, next: NextFunction): void
      {
            try
            {
                  if (!req.session || !req.session.username)
                  {
                        res.status(200).send({ isEncrypted: false, data: { found: false } });
                        return;
                  } else
                  {
                        this.model.verifyUser(req.session.username, (result, err) =>
                        {
                              if (!err)
                              {
                                    if (result && result.length)
                                          res.status(200).send({ isEncrypted: false, data: { found: true } });
                                    else
                                          throw new RequestError(401, "User is not found or something is wrong!", "Authentication error");
                              }
                              else next(new RequestError(500, `${ err.message } of query \`${ err.sql }\``, "MySQL query error"));
                        });
                  }
            }
            catch (err)
            {
                  next(err);
            }
      }

      logout(req: Request, res: Response, next: NextFunction): void
      {
            try
            {
                  if (!req.session || !req.session.username)
                        throw new RequestError(400, "Session cookie not present!", "Authentication error")
                  else
                  {
                        // Get the current file path
                        const currentFilePath: string = fileURLToPath(import.meta.url);

                        // Get the current directory by resolving the file path
                        const currentDirectory: string = path.dirname(currentFilePath);

                        // Get the parrent directory
                        const parentDirectory: string = path.resolve(currentDirectory, "..");

                        // Specify the session file directory
                        const sessionDir: string = path.join(parentDirectory, "data", "session");

                        // Define the session ID or session file name for which you want to delete its additional files
                        const sessionID: string = req.sessionID;

                        // Regular expression pattern for matching the additional session files
                        const additionalFilesPattern: RegExp = new RegExp(
                              `^${ sessionID }.json.\\d+$`
                        );
                        req.session.destroy((err) =>
                        {
                              if (!err)
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
            catch (err)
            {
                  next(err);
            }
      }

      validation(req: Request, res: Response, next: NextFunction): void
      {
            try
            {
                  const username = req.query.username;
                  if (!username)
                        throw new RequestError(400, "Username field is empty or null or not found!", "Missing property");
                  if (typeof username === "string")
                        this.model.verifyUser(username, (result, err) =>
                        {
                              if (!err)
                              {
                                    if (result && result.length)
                                          res.status(200).send({ isEncrypted: false, data: { found: true } });
                                    else
                                          res
                                                .status(200)
                                                .send({ isEncrypted: false, data: { found: false } });
                              }
                              else next(new RequestError(500, `${ err.message } of query \`${ err.sql }\``, "MySQL query error"));
                        });
            }
            catch (err)
            {
                  next(err);
            }
      }

      newPassword(req: Request, res: Response, next: NextFunction): void
      {
            try
            {
                  const data: any = decryptor(req.body.data);
                  if (!data.params.username)
                        throw new RequestError(400, "Username field is empty or null or not found!", "Missing property");
                  if (!data.params.password)
                        throw new RequestError(400, "Password field is empty or null or not found!", "Missing property");
                  this.model.recovery(
                        data.params.username,
                        data.params.password,
                        (result, err) =>
                        {
                              if (!err)
                                    res.status(200).send({ message: "Password changed!" });
                              else next(new RequestError(500, `${ err.message } of query \`${ err.sql }\``, "MySQL query error"));
                        }
                  );
            }
            catch (err)
            {
                  next(err);
            }
      }
}

export default authenticationController;
