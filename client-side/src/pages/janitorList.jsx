import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/workerList.css';
import { Janitor } from '../data/worker.js';

export const JanitorList = () =>
{
      const effectRan = useRef(false);

      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('WorkerManage');
                  setColor[0].style.color = "blue";

                  let setButton = document.getElementById('renderJanitors');
                  setButton.style.background = "bisque";

                  for (let key in Janitor)
                  {
                        document.getElementById("workerList").innerHTML += "<tr>"
                              + "<td>" + Janitor[key].ten + "</td>"
                              + "<td>" + Janitor[key].ID + "</td>"
                              + "<td>"
                              + "<button class = 'Workers' id =" + Janitor[key].ID + "> Chi tiết </button>"
                              + "<button class = 'Area' id =Area_" + Janitor[key].ID + "> Phân công khu vực</button>"
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
                  obj = document.getElementsByClassName('Area');
                  for (let i = 0; i < obj.length; i++)
                        obj[i].addEventListener('click', taskingArea);

                  effectRan.current = true;
            }
      });



      const renderCollectors = (event) =>
      {
            event.preventDefault();
            Navigate("/sideMenu/workerList/collectorList");
      }

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

      const taskingArea = (event) =>
      {
            event.preventDefault();
            let target = event.currentTarget.id.substring(5);
            Navigate("./" + target + "/taskScheduleJanitor");
      }

      return (
            <div class="myWorkerList">
                  <h1>Danh sách nhân viên</h1>
                  <div class="rendering">
                        <button id="renderJanitors">Danh sách nhân viên gom rác (Janitors)</button>
                        <button onClick={ renderCollectors }>Danh sách nhân viên chở rác (Collectors)</button>
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