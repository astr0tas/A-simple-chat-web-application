var mysql = require('mysql');

var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Nghia0785237606",
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

app.get('/mcpList', (req, res) =>
{
      con.query("select mcpID,address,maximumCap,currentCap from mcp;", function (err, result, fields)
      {
            if (err) throw err;
            res.status(200);
            res.json(result);
      });
});

// app.get('/mcpList/detail', (req, res) =>
// {
//       const id;
//       con.query("select * from mcp;", function (err, result, fields)
//       {
//             if (err) throw err;
//             res.status(200);
//             res.json(result);
//       });
// });

app.get('/vehicleList', (req, res) =>
{
      con.query("select vehicleID,status from vehicle;", function (err, result, fields)
      {
            if (err) throw err;
            res.status(200);
            res.json(result);
      });
});

// app.get('/vehicleList/detail', (req, res) =>
// {
//       const id;
//       con.query("select vehicleID,status from vehicle;", function (err, result, fields)
//       {
//             if (err) throw err;
//             res.status(200);
//             res.json(result);
//       });
// });

app.get('/routeList', (req, res) =>
{
      con.query("select * from route;", function (err, result, fields)
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
      con.query("select * from area;", function (err, result, fields)
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

// app.get('/workerList', (req, res) =>
// {
//       const type;
//       con.query("select * from where left(employeeID,1)={type};", function (err, result, fields)
//       {
//             if (err) throw err;
//             res.status(200);
//             res.json(result);
//       });
// });

// app.get('/workerList/detail', (req, res) =>
// {
//       const id;
//       con.query("select * from employee;", function (err, result, fields)
//       {
//             if (err) throw err;
//             res.status(200);
//             res.json(result);
//       });
// });

app.listen(PORT, (error) =>
{
      if (!error)
            console.log("Server is successfully running and is listening on port: " + PORT)
      else
            console.log("Error occurred, server can't start: ", error);
});