import express, { Router } from "express";
import { key } from "../index.js"; // Note for AuthenticationController.ts: Must include `.js` extension in order to work properly!
import { AuthenticationModel } from "../model/Authentication.Model.js"; // Note for AuthenticationController.ts: Must include `.js` extension in order to work properly!
import mysql from "mysql2";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


const model: AuthenticationModel = new AuthenticationModel();

const AuthenticationRoutes: Router = express.Router();

AuthenticationRoutes.post('/login', (req, res) =>
{
      const data: any = JSON.parse(key.decrypt(req.body.data, 'utf8'));
      model.login(data.params.username, data.params.password, (result, err) =>
      {
            if (err)
            {
                  console.log(err);
                  res.status(500).send({ message: 'Server internal error!' });
            }
            else
            {
                  if (result && result.length)
                  {
                        req.session.username = result[0].username;
                        req.session.save(() =>
                        {
                              // Session saved
                              res.status(200).send({ isEncrypted: false, data: { found: true } });
                        });
                  }
                  else
                        res.status(200).send({ isEncrypted: false, data: { found: false } });
            }
      });
});

AuthenticationRoutes.get('/', (req, res) =>
{
      if (!req.session)
      {
            res.status(401).send('Session cookie not present!');
            return;
      }
      else
      {
            model.validateUser(req.session.username, (result, err) =>
            {
                  if (err)
                  {
                        console.log(err);
                        res.status(500).send({ message: 'Server internal error!' });
                  }
                  else
                  {
                        if (result && result.length)
                              res.status(200).send({ found: true });
                        else
                              res.status(200).send({ found: false });
                  }
            });
      }
});

AuthenticationRoutes.get('/logout', (req, res) =>
{
      if (!req.session)
      {
            res.status(401).send('Session cookie not present!');
            return;
      }
      else
      {
            // Get the current file path
            const currentFilePath: string = fileURLToPath(import.meta.url);

            // Get the current directory by resolving the file path
            const currentDirectory: string = path.dirname(currentFilePath);

            // Get the parrent directory
            const parentDirectory: string = path.resolve(currentDirectory, '..');

            // Specify the session file directory
            const sessionDir: string = path.join(parentDirectory, 'model', 'sessions');

            // Define the session ID or session file name for which you want to delete its additional files
            const sessionID: string = req.sessionID;

            // Regular expression pattern for matching the additional session files
            const additionalFilesPattern: RegExp = new RegExp(`^${ sessionID }\.json\.\\d+$`);
            req.session.destroy((err) =>
            {
                  if (err)
                  {
                        console.log(err);
                        console.error('Error destroying session:', err);
                  }
                  else
                  {
                        res.clearCookie('connect.sid');
                        res.status(200).send({ message: 'Logged out successfully!' });

                        // Get a list of files in the session directory
                        fs.readdir(sessionDir, (err, files) =>
                        {
                              if (err)
                              {
                                    console.error('Error reading session directory:', err);
                                    return;
                              }

                              // Filter the list to include only the additional session files for the specified session
                              const additionalFiles: string[] = files.filter((file) => additionalFilesPattern.test(file));

                              // Delete each additional session file
                              additionalFiles.forEach((file) =>
                              {
                                    const filePath = `${ sessionDir }/${ file }`;
                                    fs.unlink(filePath, (err) =>
                                    {
                                          if (err)
                                          {
                                                console.error('Error deleting additional session file:', filePath, err);
                                          } else
                                          {
                                                console.log('Additional session file deleted:', filePath);
                                          }
                                    });
                              });
                        });
                  }
            });
      }
});

AuthenticationRoutes.post('/recoveryValidation', (req, res) =>
{
      const data: any = JSON.parse(key.decrypt(req.body.data, 'utf8'));
      model.validateUser(data.params.username, (result, err) =>
      {
            if (err)
            {
                  console.log(err);
                  res.status(500).send({ message: 'Server internal error!' });
            }
            else
            {
                  if (result && result.length)
                        res.status(200).send({ isEncrypted: false, data: { found: true } });
                  else
                        res.status(200).send({ isEncrypted: false, data: { found: false } });
            }
      });
});

AuthenticationRoutes.post('/recoveryNewPassword', (req, res) =>
{
      const data: any = JSON.parse(key.decrypt(req.body.data, 'utf8'));
      model.recovery(data.params.username, data.params.password, (result, err) =>
      {
            if (err)
            {
                  console.log(err);
                  res.status(500).send({ message: 'Server internal error!' });
            }
            else
                  res.status(200).send({ isEncrypted: false, data: { message: 'Password changed!' } });
      });
});

export default AuthenticationRoutes;