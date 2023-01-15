const padTo2Digits = (num) =>
{
      return num.toString().padStart(2, '0');
}

const formatDate = (date) =>
{
      return [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
            date.getFullYear(),
      ].join('/');
}

let mcp01 = require('./img/mcp01.png');
let mcp02 = require('./img/mcp02.png');
let mcp03 = require('./img/mcp03.png');
let mcp04 = require('./img/mcp04.png');
let mcp05 = require('./img/mcp05.png');
let mcp06 = require('./img/mcp06.png');
let mcp07 = require('./img/mcp07.png');
let mcp08 = require('./img/mcp08.png');
let mcp09 = require('./img/mcp09.png');
let mcp10 = require('./img/mcp10.png');

var mcpList = [
      {
            ma: "MCP01",
            diaChi: "Hùng Vương, Quận 10, TP.HCM",
            sucChuaToiDa: 30,
            sucChuaHienTai: 15,
            lanThuGomGanDay: formatDate(new Date(new Date() - 2 * 24 * 60 * 60 * 1000)),
            anh: mcp01
      },
      {
            ma: "MCP02",
            diaChi: "Lê Hồng Phong, Quận 10, TP.HCM",
            sucChuaToiDa: 20,
            sucChuaHienTai: 17,
            lanThuGomGanDay: formatDate(new Date(new Date() - 3 * 24 * 60 * 60 * 1000)),
            anh: mcp02
      },
      {
            ma: "MCP03",
            diaChi: "Lý Thái Tổ, Quận 10, TP.HCM",
            sucChuaToiDa: 40,
            sucChuaHienTai: 9,
            lanThuGomGanDay: formatDate(new Date(new Date() - 1 * 24 * 60 * 60 * 1000)),
            anh: mcp03
      },
      {
            ma: "MCP04",
            diaChi: "Nguyễn Chí Thanh, Quận 10, TP.HCM",
            sucChuaToiDa: 18,
            sucChuaHienTai: 13,
            lanThuGomGanDay: formatDate(new Date(new Date() - 4 * 24 * 60 * 60 * 1000)),
            anh: mcp04
      },
      {
            ma: "MCP05",
            diaChi: "Sư Vạn Hạnh, Quận 10, TP.HCM",
            sucChuaToiDa: 24,
            sucChuaHienTai: 19,
            lanThuGomGanDay: formatDate(new Date(new Date() - 3 * 24 * 60 * 60 * 1000)),
            anh: mcp05
      },
      {
            ma: "MCP06",
            diaChi: "Trần Nhân Tôn, Quận 10, TP.HCM",
            sucChuaToiDa: 20,
            sucChuaHienTai: 20,
            lanThuGomGanDay: formatDate(new Date(new Date() - 1 * 24 * 60 * 60 * 1000)),
            anh: mcp06
      },
      {
            ma: "MCP07",
            diaChi: "Ngô Gia Tự, Quận 10, TP.HCM",
            sucChuaToiDa: 15,
            sucChuaHienTai: 0,
            lanThuGomGanDay: formatDate(new Date(new Date() - 4 * 24 * 60 * 60 * 1000)),
            anh: mcp07
      },
      {
            ma: "MCP08",
            diaChi: "Nguyễn Tri Phương, Quận 10, TP.HCM",
            sucChuaToiDa: 30,
            sucChuaHienTai: 27,
            lanThuGomGanDay: formatDate(new Date(new Date() - 5 * 24 * 60 * 60 * 1000)),
            anh: mcp08
      },
      {
            ma: "MCP09",
            diaChi: "Ngô Quyền, Quận 10, TP.HCM",
            sucChuaToiDa: 17,
            sucChuaHienTai: 15,
            lanThuGomGanDay: formatDate(new Date(new Date() - 2 * 24 * 60 * 60 * 1000)),
            anh: mcp09
      },
      {
            ma: "MCP10",
            diaChi: "3 Tháng 2, Quận 10, TP.HCM",
            sucChuaToiDa: 15,
            sucChuaHienTai: 10,
            lanThuGomGanDay: formatDate(new Date(new Date() - 5 * 24 * 60 * 60 * 1000)),
            anh: mcp10
      }
];

export default mcpList;