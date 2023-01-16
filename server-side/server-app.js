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

app.delete('/mcpList/delete', (req, res) =>
{
      con.query("delete from mcp where mcpID=\'" + req.query.ID + "\';", function (err, result, fields)
      {
            if (err) throw err;
            res.status(200);
            res.json({ message: "Xóa thông tin MCP thành công!" });
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

app.delete('/vehicleList/delete', (req, res) =>
{
      con.query("delete from vehicle where vehicleID=\'" + req.query.ID + "\';", function (err, result, fields)
      {
            if (err) throw err;
            res.status(200);
            res.json({ message: "Xóa thông tin xe thành công!" });
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

app.get('/routeList/detail', (req, res) =>
{
      con.query("select * from route where routeID=\'" + req.query.ID + "\';", function (err, result, fields)
      {
            if (err) throw err;
            res.status(200);
            res.json(result);
      });
});

app.delete('/routeList/delete', (req, res) =>
{
      con.query("delete from route where routeID=\'" + req.query.ID + "\';", function (err, result, fields)
      {
            if (err) throw err;
            res.status(200);
            res.json({ message: "Xóa thông tin tuyến đường thành công!" });
      });
});

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

app.delete('/areaList/delete', (req, res) =>
{
      con.query("delete from area where areaID=\'" + req.query.ID + "\';", function (err, result, fields)
      {
            if (err) throw err;
            res.status(200);
            res.json({ message: "Xóa thông tin khu vực thành công!" });
      });
});

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

app.delete('/workerList/delete', (req, res) => 
{
      con.query("delete from employee where employeeID=\'" + req.query.ID + "\';", function (err, result, fields)
      {
            if (err) throw err;
            res.status(200);
            res.json({ message: "Xóa thông tin công nhân thành công!" });
      });
});

app.listen(PORT, (error) =>
{
      if (!error)
            console.log("Server is successfully running and is listening on port: " + PORT)
      else
            console.log("Error occurred, server can't start: ", error);
});