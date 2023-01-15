var mysql = require('mysql');

var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "uwc"
});

con.connect(function (err)
{
      if (err) throw err;
});


const express = require('express');
var cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());

app.get('/login', (req, res) =>
{
      con.query("select * from accounts;", function (err, result, fields)
      {
            if (err) throw err;
            res.status(200);
            res.json(result);
      });
});

app.get('/mcpList', (req, res) =>
{
      con.query("select mcpID,address,maximumCap,currentCap from mcp order by mcpID;", function (err, result, fields)
      {
            if (err) throw err;
            res.status(200);
            res.json(result);
      });
});

app.get('/mcpList/detail', (req, res) =>
{
      con.query("select * from mcp where mcpID=\'" + req.query.ID + "\';", function (err, result, fields)
      {
            if (err) throw err;
            res.status(200);
            res.json(result);
      });
});

app.get('/vehicleList', (req, res) =>
{
      con.query("select vehicleID,status from vehicle order by vehicleID;", function (err, result, fields)
      {
            if (err) throw err;
            res.status(200);
            res.json(result);
      });
});

app.get('/vehicleList/detail', (req, res) =>
{
      con.query("select * from vehicle where vehicleID=\'" + req.query.ID + "\';", function (err, result, fields)
      {
            if (err) throw err;
            res.status(200);
            res.json(result);
      });
});

app.get('/routeList', (req, res) =>
{
      con.query("select * from route order by routeID;", function (err, result, fields)
      {
            if (err) throw err;
            res.status(200);
            res.json(result);
      });
});

// app.get('/routeList/detail', (req, res) =>
// {
//       const id;
//       con.query("select * from route;", function (err, result, fields)
//       {
//             if (err) throw err;
//             res.status(200);
//             res.json(result);
//       });
// });

app.get('/areaList', (req, res) =>
{
      con.query("select * from area order by areaID;", function (err, result, fields)
      {
            if (err) throw err;
            res.status(200);
            res.json(result);
      });
});

// app.get('/areaList/detail', (req, res) =>
// {
//       const id;
//       con.query("select * from area;", function (err, result, fields)
//       {
//             if (err) throw err;
//             res.status(200);
//             res.json(result);
//       });
// });

app.get('/workerList', (req, res) =>
{
      con.query("select name,employeeID from employee where left(employeeID,1)=\'" + req.query.type + "\' order by employeeID;", function (err, result, fields)
      {
            if (err) throw err;
            res.status(200);
            res.json(result);
      });
});

app.get('/workerList/detail', (req, res) =>
{
      con.query("select * from employee where employeeID=\'" + req.query.ID + "\';", function (err, result, fields)
      {
            if (err) throw err;
            res.status(200);
            res.json(result);
      });
});

app.listen(PORT, (error) =>
{
      if (!error)
            console.log("Server is successfully running and is listening on port: " + PORT)
      else
            console.log("Error occurred, server can't start: ", error);
});