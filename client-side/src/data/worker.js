import {  formatDate } from './formatDate.js';

Date.prototype.addDays = function (days)
{
      const date = new Date(this.valueOf())
      date.setDate(date.getDate() + days)
      return date
}

export class WorkerSchedule
{
      constructor(Ngay, Thoigian, Mota, Trangthai)
      {
            this.Ngay = Ngay;
            this.Thoigian = Thoigian;
            this.Mota = Mota;
            this.Trangthai = Trangthai;
      }
}

var Janitor = [
      {
            ten: "Nguyễn Anh T",
            ID: "J01",
            CCCD: "023856000265",
            ngaysinh: "05/03/1990",
            diachi: "TP.HCM",
            sdt: "0365977562",
            email: "anht53@gmail.com",
            gioitinh: "Nam",
            lichlamviec: [new WorkerSchedule(formatDate((new Date().addDays(1))).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }),'19h00-0h00','Tập kết rác tại khu vực A01','Chưa đến thời gian hoàn thành')],
      },
      {
            ten: "Trần H",
            ID: "J02",
            CCCD: "036597000269",
            ngaysinh: "12/06/1989",
            diachi: "TP.HCM",
            sdt: "0322585123",
            email: "h12@gmail.com",
            gioitinh: "Nam",
            lichlamviec: [],
      },
      {
            ten: "Lê Anh K",
            ID: "J03",
            CCCD: "065125000247",
            ngaysinh: "28/10/1994",
            diachi: "TP.HCM",
            sdt: "0254666732",
            email: "anhk28@gmail.com",
            gioitinh: "Nam",
            lichlamviec: [],
      },
      {
            ten: "Lê Trung K",
            ID: "J04",
            CCCD: "023857000982",
            ngaysinh: "27/07/1993",
            diachi: "TP.HCM",
            sdt: "0897222876",
            email: "trungk@gmail.com",
            gioitinh: "Nam",
            lichlamviec: [],
      },
      {
            ten: "Nguyễn Xuân A",
            ID: "J05",
            CCCD: "053432000232",
            ngaysinh: "18/01/1989",
            diachi: "TP.HCM",
            sdt: "0784002777",
            email: "anguyen@gmail.com",
            gioitinh: "Nam",
            lichlamviec: [],
      },
      {
            ten: "Trần B",
            ID: "J06",
            CCCD: "078456000821",
            ngaysinh: "19/09/1996",
            diachi: "TP.HCM",
            sdt: "0789232177",
            email: "btran@gmail.com",
            gioitinh: "Nam",
            lichlamviec: [],
      },
      {
            ten: "Dương Anh L",
            ID: "J07",
            CCCD: "098255000347",
            ngaysinh: "25/11/1993",
            diachi: "TP.HCM",
            sdt: "0122892732",
            email: "anhl93@gmail.com",
            gioitinh: "Nam",
            lichlamviec: [],
      },
      {
            ten: "Đinh Xuân P",
            ID: "J08",
            CCCD: "098299000271",
            ngaysinh: "12/05/1991",
            diachi: "TP.HCM",
            sdt: "0902804277",
            email: "xuanp@gmail.com",
            gioitinh: "Nam",
            lichlamviec: [],
      },
      {
            ten: "Nguyễn N",
            ID: "J09",
            CCCD: "090288000281",
            ngaysinh: "22/06/1996",
            diachi: "TP.HCM",
            sdt: "0908137822",
            email: "nguyenn22@gmail.com",
            gioitinh: "Nam",
            lichlamviec: [],
      },
      {
            ten: "Võ Gia K",
            ID: "J10",
            CCCD: "097369000189",
            ngaysinh: "17/07/1989",
            diachi: "TP.HCM",
            sdt: "0909767255",
            email: "kvo17@gmail.com",
            gioitinh: "Nam",
            lichlamviec: [],
      },
];

export { Janitor };

var Collector = [
      {
            ten: "Nguyễn Anh D",
            ID: "C01",
            CCCD: "058365000269",
            ngaysinh: "15/03/1992",
            diachi: "TP.HCM",
            sdt: "0957652236",
            email: "anhd15@gmail.com",
            gioitinh: "Nam",
            lichlamviec: [new WorkerSchedule(formatDate((new Date().addDays(1))).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }), '7h00-12h00', 'Thu gom rác trên tuyến đường R01', 'Chưa đến thời gian thực hiện')]
      },
      {
            ten: "Trần Văn H",
            ID: "C02",
            CCCD: "067123000972",
            ngaysinh: "19/05/1987",
            diachi: "TP.HCM",
            sdt: "0962819002",
            email: "htran@gmail.com",
            gioitinh: "Nam",
            lichlamviec: [],
      },
      {
            ten: "Đỗ Đức T",
            ID: "C03",
            CCCD: "097829000128",
            ngaysinh: "09/12/1996",
            diachi: "TP.HCM",
            sdt: "0907182666",
            email: "tdo09@gmail.com",
            gioitinh: "Nam",
            lichlamviec: [],
      },
      {
            ten: "Nguyễn Cao C",
            ID: "C04",
            CCCD: "078129000777",
            ngaysinh: "15/11/1994",
            diachi: "TP.HCM",
            sdt: "0906123765",
            email: "caoc@gmail.com",
            gioitinh: "Nam",
            lichlamviec: [],
      },
      {
            ten: "Đỗ Trọng A",
            ID: "C05",
            CCCD: "019272000891",
            ngaysinh: "22/07/1993",
            diachi: "TP.HCM",
            sdt: "0909436771",
            email: "trongado@gmail.com",
            gioitinh: "Nam",
            lichlamviec: [],
      },
      {
            ten: "Trần Trọng N",
            ID: "C06",
            CCCD: "012298000281",
            ngaysinh: "09/08/1997",
            diachi: "TP.HCM",
            sdt: "0978127775",
            email: "ntran@gmail.com",
            gioitinh: "Nam",
            lichlamviec: [],
      },
      {
            ten: "Bùi Minh T",
            ID: "C07",
            CCCD: "098193000212",
            ngaysinh: "25/10/1995",
            diachi: "TP.HCM",
            sdt: "0778291212",
            email: "minht@gmail.com",
            gioitinh: "Nam",
            lichlamviec: [],
      },
      {
            ten: "Vũ Trần H",
            ID: "C08",
            CCCD: "078129000271",
            ngaysinh: "19/02/1996",
            diachi: "TP.HCM",
            sdt: "0782029120",
            email: "hvu19@gmail.com",
            gioitinh: "Nam",
            lichlamviec: [],
      },
      {
            ten: "Nguyễn Minh Q",
            ID: "C09",
            CCCD: "079891000281",
            ngaysinh: "08/08/1996",
            diachi: "TP.HCM",
            sdt: "0901876555",
            email: "minhq@gmail.com",
            gioitinh: "Nam",
            lichlamviec: [],
      },
      {
            ten: "Nguyễn Lâm N",
            ID: "C10",
            CCCD: "081922000891",
            ngaysinh: "13/03/1994",
            diachi: "TP.HCM",
            sdt: "0989137225",
            email: "nnguyen13@gmail.com",
            gioitinh: "Nam",
            lichlamviec: [],
      },
];

export { Collector };