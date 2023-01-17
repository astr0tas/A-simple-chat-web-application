import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { formatDate_DDMMYYYY } from '../tools/formatDate.js';
import ReactDOM from 'react-dom/client';
import '../css/workerInfo.css';

export const WorkerInfo = () =>
{
      const effectRan = useRef(false);

      const currentRoute = useParams();
      const workerID = currentRoute.workerID;

      const PrintInfo = (props) =>
      {
            return (
                  <>
                        <thead><h2>Mã nhân viên: </h2> <h2 class="Props">  { props.workerID } </h2></thead>
                        <br />
                        <br />
                        <thead><h2>Họ tên: </h2> <h2 class="Props">  { props.name }  </h2></thead>
                        < br />
                        <br />
                        <thead><h2>Giới tính: </h2> <h2 class="Props"> { props.gender } </h2></thead>
                        < br />
                        <br />
                        <thead><h2>Công việc: </h2> <h2 class="Props"> { props.congViec } </h2></thead>
                        < br />
                        <br />
                        <thead><h2>Số điện thoại: </h2> <h2 class="Props"> { props.phoneNum } </h2></thead>
                        < br />
                        <br />
                        <thead><h2>Email: </h2> <h2 class="Props">{ props.email } </h2></thead>
                        < br />
                        <br />
                        <thead><h2>Số CCCD: </h2> <h2 class="Props"> { props.ssn } </h2></thead>
                        < br />
                        <br />
                        <thead><h2>Ngày sinh: </h2> <h2 class="Props"> { props.date } </h2></thead>
                        < br />
                        <br />
                        <thead><h2>Địa chỉ: </h2> <h2 class="Props">  { props.address } </h2></thead>
                        < br />
                        <br />
                  </>
            );
      }

      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('WorkerManage');
                  setColor[0].style.color = "blue";

                  let congViec;
                  if (workerID[0] === 'J')
                        congViec = "Công nhân thu gom rác";
                  else
                        congViec = "Công nhân chở rác";

                  axios.get('http://localhost:4000/workerList/detail', { params: { ID: workerID } })
                        .then(res =>
                        {
                              const render = ReactDOM.createRoot(document.getElementById('info'));
                              render.render(<PrintInfo workerID={ workerID } name={ res.data[0].name } gender={ res.data[0].gender } congViec={ congViec } phoneNum={ res.data[0].phoneNum } email={ res.data[0].email } ssn={ res.data[0].ssn } date={ formatDate_DDMMYYYY(new Date(Date.parse(res.data[0].dob))) } address={ res.data[0].address } />);
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
                  <table className="Properties" id="info">
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