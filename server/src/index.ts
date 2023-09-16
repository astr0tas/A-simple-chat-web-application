import express, { Express, Request, Response } from 'express';

const port: number = 8080;

const app: Express = express();

app.get('/', (req: Request, res: Response) =>
{
      res.send("Hi");
});

app.listen(port, () =>
{
      console.log("Server now listening on port " + port);
});