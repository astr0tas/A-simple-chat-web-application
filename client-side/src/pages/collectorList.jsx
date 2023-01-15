import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/workerList.css';
import { Collector } from '../data/worker.js';

export const CollectorList = () =>
{
      const effectRan = useRef(false);

      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('WorkerManage');
                  setColor[0].style.color = "blue";

                  let setButton = document.getElementById('renderCollectors');
                  setButton.style.background = "bisque";

                  for (let key in Collector)
                  {
                        document.getElementById("workerList").innerHTML += "<tr>"
                              + "<td>" + Collector[key].ten + "</td>"
                              + "<td>" + Collector[key].ID + "</td>"
                              + "<td>"
                              + "<button class = 'Workers' id =" + Collector[key].ID + "> Chi tiết </button>"
                              + "<button class = 'Route' id =Route_" + Collector[key].ID + "> Tạo tuyến đường</button>"
                              + "<button class='WorkerDel'>Xóa</button>"
                              + "</td>"
                              + "<tr/>";
                  }

                  let obj = document.getElementsByClassName('WorkerDel');
                  for (let i = 0; i < obj.length; i++)
                        obj[i].addEventListener('click', handleClickNotDev);
                  obj = document.getElementsByClassName('Workers');
                  for (let i = 0; i < obj.length; i++)
                        obj[i].addEventListener('click', handleClickInfo);
                  obj = document.getElementsByClassName('Route');
                  for (let i = 0; i < obj.length; i++)
                        obj[i].addEventListener('click', taskingRoute);

                  effectRan.current = true;
            }
      });

      const Navigate = useNavigate();

      const handleClickNotDev = (event) =>
      {
            event.preventDefault();
            Navigate("/sideMenu/inDev");
      }

      const handleClickInfo = (event) =>
      {
            event.preventDefault();
            Navigate("../workerList/" + event.currentTarget.id);
      }

      const taskingRoute = (event) =>
      {
            event.preventDefault();
            let target = event.currentTarget.id.substring(6);
            Navigate("./" + target + "/taskScheduleCollector");
      }

      const renderJanitors = (event) =>
      {
            event.preventDefault();
            Navigate("/sideMenu/workerList/janitorList");
      }

      return (
            <div class="myWorkerList">
                  <h1>Danh sách nhân viên</h1>
                  <div class="rendering">
                        <button onClick={ renderJanitors }>Danh sách nhân viên gom rác (Janitors)</button>
                        <button id="renderCollectors">Danh sách nhân viên chở rác (Collectors)</button>
                  </div>
                  <table>
                        <thead>
                              <tr>
                                    <th><h3>TÊN NHÂN VIÊN</h3></th>
                                    <th><h3>MÃ NHÂN VIÊN</h3></th>
                                    <th><h3>TÁC VỤ</h3></th>
                              </tr>
                        </thead>
                        <tbody id="workerList">
                        </tbody>
                  </table>
                  <br />
                  <br />
                  <view>
                        <button onClick={ handleClickNotDev }>Thêm nhân viên</button>
                  </view>
            </div>
      );
}