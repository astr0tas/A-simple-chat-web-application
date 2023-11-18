import { Request, Response, NextFunction } from "express";
import RequestError from "../tools/requestError.tool.js"; // Must include `.js` extension in order to run properly!

export default function errorHandler(
      err: any,
      req: Request,
      res: Response,
      next: NextFunction
): void
{
      console.error("Error name: " + err.name);
      console.error("Error message: " + err.message);
      console.error("Error stack: " + err.stack);

      if (err instanceof RequestError && err.status!==500)
            res.status(err.status).send({ message: err.message });
      else
            res.status(500).send({ message: "Internal Server Error!" });
}

