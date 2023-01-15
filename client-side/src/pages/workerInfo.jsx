import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Collector, Janitor } from '../data/worker.js';
import '../css/workerInfo.css';

export const WorkerInfo = () =>
{
      const effectRan = useRef(false);

      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('WorkerManage');
                  setColor[0].style.color = "blue";
                  effectRan.current = true;
            }
      });

      const currentRoute = useParams();
      const workerID = currentRoute.workerID;

      let gioiTinh, congViec, hoTen, diaChi, ngaySinh, CCCD, sdt, email;

      if (workerID[0] === 'J')
      {
            congViec = "Công nhân thu gom rác";
            for (let key in Janitor)
            {
                  if (Janitor[key].ID === workerID)
                  {
                        gioiTinh = Janitor[key].gioitinh;
                        hoTen = Janitor[key].ten;
                        diaChi = Janitor[key].diachi;
                        ngaySinh = Janitor[key].ngaysinh;
                        CCCD = Janitor[key].CCCD;
                        sdt = Janitor[key].sdt;
                        email = Janitor[key].email;
                        break;
                  }
            }
      }
      else
      {
            congViec = "Công nhân chở rác";
            for (let key in Collector)
            {
                  if (Collector[key].ID === workerID)
                  {
                        gioiTinh = Collector[key].gioitinh;
                        hoTen = Collector[key].ten;
                        diaChi = Collector[key].diachi;
                        ngaySinh = Collector[key].ngaysinh;
                        CCCD = Collector[key].CCCD;
                        sdt = Collector[key].sdt;
                        email = Collector[key].email;
                        break;
                  }
            }
      }

      const Navigate = useNavigate();

      const handleClick = (event) =>
      {
            event.preventDefault();
            Navigate(-1);
      }

      const getSchedule = (event) =>
      {
            event.preventDefault();
            Navigate("./schedule");
      }

      return (
            <div class="workerInfo">
                  <h1>Thông tin chi tiết nhân viên</h1>
                  <br />
                  <img src='https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX33936888.jpg' alt="Ảnh nhân viên" />
                  <br />
                  <table className="Properties">
                        <thead><h2>Mã nhân viên: </h2> <h2 class="Props">{ workerID }</h2></thead>
                        <br />
                        <thead><h2>Họ tên: </h2> <h2 class="Props">{ hoTen }</h2></thead>
                        <br />
                        <thead><h2>Giới tính: </h2> <h2 class="Props">{ gioiTinh }</h2></thead>
                        <br />
                        <thead><h2>Công việc: </h2> <h2 class="Props">{ congViec }</h2></thead>
                        <br />
                        <thead><h2>Số điện thoại: </h2> <h2 class="Props">{ sdt }</h2></thead>
                        <br />
                        <thead><h2>Email: </h2> <h2 class="Props">{ email }</h2></thead>
                        <br />
                        <thead><h2>Số CCCD: </h2> <h2 class="Props">{ CCCD }</h2></thead>
                        <br />
                        <thead><h2>Ngày sinh: </h2> <h2 class="Props">{ ngaySinh }</h2></thead>
                        <br />
                        <thead><h2>Địa chỉ: </h2> <h2 class="Props">{ diaChi }</h2></thead>
                        <br />
                  </table>
                  <br />
                  <br />
                  <div class="buttons">
                        <button onClick={ handleClick }>Quay lại</button>
                        <button onClick={ getSchedule }>Lịch làm việc</button>
                  </div>
            </div>
      );
}