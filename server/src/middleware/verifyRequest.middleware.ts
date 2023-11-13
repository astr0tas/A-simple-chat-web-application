import { Request, Response, NextFunction } from "express";
import mysql from 'mysql2';
import exceptionURLs from "../config/exceptionURL.config.js"; // Must include `.js` extension in order to work properly!
import authenticationModel from "../model/authentication.model.js"; // Must include `.js` extension in order to work properly!
import contentTypes from "../config/contentTypeHeader.config.js"; // Must include `.js` extension in order to work properly!
import noHeaderMethods from "../config/noHeaderMethod.config.js"; // Must include `.js` extension in order to work properly!

const validator: authenticationModel = new authenticationModel();

function isException(url: string): boolean
{
      for (let i: number = 0; i < exceptionURLs.length; i++)
            if (url.includes(exceptionURLs[i]))
                  return true;
      return false;
}

export default function verifyRequest(req: Request, res: Response, next: NextFunction): void
{
      console.log('====================================');
      console.log('Request url: ' + req.url);
      console.log('Request method: ' + req.method);
      const contentType = req.get('Content-Type');
      console.log('Content-Type:', contentType);
      console.log('------------------------------------');

      if (isException(req.url))
            next();
      else
      {
            if (!req.session || !req.session.username)
            {
                  res.status(400).send({ message: 'Session cookie not present!' });
                  return;
            }

            validator.verifyUser(req.session.username, (result: mysql.RowDataPacket[] | null, err: mysql.QueryError | null) =>
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
                              // Verify the Content-Type header of requests
                              if (!noHeaderMethods.includes(req.method) && contentType && contentTypes.includes(contentType))
                              {
                                    res.status(400).send({ message: 'Invalid Content-Type' });
                                    return;
                              }
                              next();
                        }
                        else
                              res.status(401).send({ message: "Invalid user!" });
                  }
            });
      }
      console.log('====================================');
}