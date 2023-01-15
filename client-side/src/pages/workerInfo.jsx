import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { formatDate } from '../data/formatDate.js';
import '../css/workerInfo.css';

export const WorkerInfo = () =>
{
      const effectRan = useRef(false);

      const currentRoute = useParams();
      const workerID = currentRoute.workerID;

      const [congViec, setCongViec] = useState();
      const [gioiTinh, setGioiTinh] = useState();
      const [hoTen, setHoTen] = useState();
      const [diaChi, setDiaChi] = useState();
      const [ngaySinh, setNgaySinh] = useState();
      const [CCCD, setCCCD] = useState();
      const [sdt, setSdt] = useState();
      const [email, setEmail] = useState();

      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('WorkerManage');
                  setColor[0].style.color = "blue";

                  if (workerID[0] === 'J')
                        setCongViec("Công nhân thu gom rác");
                  else
                        setCongViec("Công nhân chở rác");

                  axios.get('http://localhost:4000/workerList/detail', { params: { ID: workerID } })
                        .then(res =>
                        {
                              setGioiTinh(res.data[0].gender);
                              setHoTen(res.data[0].name);
                              setDiaChi(res.data[0].address);
                              setNgaySinh(formatDate(new Date(Date.parse(res.data[0].dob))));
                              setCCCD(res.data[0].ssn);
                              setSdt(res.data[0].phoneNum);
                              setEmail(res.data[0].email);
                        })
                        .catch(error => console.log(error));

                  effectRan.current = true;
            }
      });


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