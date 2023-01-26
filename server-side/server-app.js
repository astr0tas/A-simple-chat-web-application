const fs = require('fs');

const mysql = require('mysql');
const con = mysql.createConnection({
      host: "localhost",
      user: "uwc",
      password: "uwc123",
      database: "uwc",
      multipleStatements: true
});

con.connect(function (err)
{
      if (err) throw err;
      con.query("SET SQL_SAFE_UPDATES = 0; "
            + "call deleteWorkCalendar(); "
            + "SET SQL_SAFE_UPDATES = 1; ", function (err)
      {
            if (err) throw err;
      });
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
            result[0].picture = result[0].picture.toString('base64');
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
            result[0].picture = result[0].picture.toString('base64');
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

app.get('/routeList/info', (req, res) =>
{
      con.query("select mcp.mcpID,mcp.address,vehicle.vehicleID "
            + "from route "
            + "join mcp on mcp.routeID = route.routeID "
            + "join vehicle on vehicle.routeID = route.routeID "
            + "where route.routeID =\'" + req.query.ID + "\'; "
            + "select workCalendar.employeeID "
            + "from route "
            + "join workCalendar on workCalendar.routeID = route.routeID "
            + "where workCalendar.workDay =\'" + req.query.date + "\' and workCalendar.shift=\'" + req.query.shift + "\' and workCalendar.routeID=\'" + req.query.ID + "\';", function (err, result, fields)
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

app.get('/areaList/info', (req, res) =>
{
      con.query("select mcp.mcpID,mcp.address "
            + "from area "
            + "join mcp on mcp.areaID = area.areaID "
            + "where area.areaID =\'" + req.query.ID + "\';"
            + "select workCalendar.employeeID "
            + "from area "
            + "join workCalendar on workCalendar.areaID = area.areaID "
            + "where workCalendar.workDay =\'" + req.query.date + "\' and workCalendar.shift=\'" + req.query.shift + "\' and workCalendar.areaID=\'" + req.query.ID + "\';", function (err, result, fields)
      {
            if (err) throw err;
            res.status(200);
            res.json(result);
      });
});

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
            result[0].picture = result[0].picture.toString('base64');
            res.status(200);
            res.json(result);
      });
});

app.get('/workerList/detail/schedule', (req, res) =>
{
      con.query("select name from employee where employeeID =\'" + req.query.ID + "\'; "
            + "select workCalendar.workDay, workCalendar.shift, workCalendar.description, workCalendar.status from workCalendar where workCalendar.employeeID =\'" + req.query.ID + "\' order by workCalendar.workDay,workCalendar.shift;", function (err, result, fields)
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