import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { formatDate_DDMMYYYY } from '../tools/formatDate.js';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import '../css/workerSchedule.css';

export const WorkerSchedule = () =>
{
      const currentRoute = useParams();
      const workerID = currentRoute.workerID;

      const PrintSchedule = (props) =>
      {
            return (
                  <tr>
                        <td> { props.date } </td>
                        <td> { props.shift } </td>
                        <td>{ props.description } </td>
                        <td>{ props.status }</td>
                  </tr>
            );
      }

      const effectRan = useRef(false);

      let [job, setJob] = useState(), [name, setName] = useState();

      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('WorkerManage');
                  setColor[0].style.color = "blue";

                  if (workerID[0] === 'J')
                        setJob("thu gom rác");
                  else
                        setJob("chở rác");

                  axios.get('http://localhost:4000/workerList/detail/schedule', { params: { ID: workerID } })
                        .then(res =>
                        {
                              console.log(res);
                              setName(res.data[0][0].name);
                              let temp = [];
                              for (let i = 0; i < res.data[1].length; i++)
                              {
                                    let shift;
                                    if (res.data[1][i].shift === 1)
                                          shift = "7h00-12h00";
                                    else if (res.data[1][i].shift === 2)
                                          shift = "13h00-18h00";
                                    else
                                          shift = "19h00-00h00";
                                    temp.push(<PrintSchedule status={ res.data[1][i].status } description={ res.data[1][i].description } shift={ shift } date={ formatDate_DDMMYYYY(new Date(Date.parse(res.data[1][i].workDay))) } />);
                              }
                              const render = ReactDOM.createRoot(document.getElementById('scheduleList'));
                              render.render(<>{ temp }</>)
                        })
                        .catch(error => console.log(error));
                  
                  effectRan.current = true;
            }
      });

      const Navigate = useNavigate();

      const returnToPrevious = (event) =>
      {
            event.preventDefault();
            Navigate(-1);
      }

      return (
            <div class="schedule">
                  <h1>Lịch làm việc của công nhân { job } { name }</h1>
                  <br />
                  <table>
                        <tr>
                              <th><h3>Ngày</h3></th>
                              <th><h3>Thời gian</h3></th>
                              <th><h3>Mô tả</h3></th>
                              <th><h3>Trạng thái</h3></th>
                        </tr>
                        <tbody id="scheduleList" />
                  </table>
                  <br />
                  <br />
                  <button onClick={ returnToPrevious }>Quay lại</button>
            </div>
      );
}