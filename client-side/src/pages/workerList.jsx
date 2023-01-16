import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/workerList.css';

export const WorkerList = () =>
{

      useEffect(() =>
      {
            let setColor = document.getElementsByClassName('WorkerManage');
            setColor[0].style.color = "blue";
      });

      const Navigate = useNavigate();

      const handleClickNotDev = (event) =>
      {
            event.preventDefault();
            Navigate("/inDev");
      }

      const handleClickInfo = (event, employeeID) =>
      {
            event.preventDefault();
            Navigate("./" + employeeID);
      }

      const handleDelete = (event, employeeID) =>
      {
            event.preventDefault();
            axios.delete('http://localhost:4000/workerList/delete', { params: { ID: employeeID } })
                  .then(res =>
                  {
                        window.alert(res.data.message);
                        window.location.reload();
                  })
                  .catch(error => console.log(error));
      }

      const taskingRoute = (event, employeeID) =>
      {
            event.preventDefault();
            let target = event.currentTarget.id.substring(6);
            Navigate("./" + target + "/taskScheduleCollector");
      }

      const taskingArea = (event, employeeID) =>
      {
            event.preventDefault();
            let target = event.currentTarget.id.substring(5);
            Navigate("./" + target + "/taskScheduleJanitor");
      }

      const renderJanitors = (event) =>
      {
            event.preventDefault();

            let setButton = document.getElementById('renderJanitors');
            setButton.style.background = "bisque";
            setButton = document.getElementById('renderCollectors');
            setButton.style.background = "antiquewhite";

            document.getElementById("workerList").innerHTML = "";

            axios.get('http://localhost:4000/workerList', {
                  params: {
                        type: 'J'
                  }
            })
                  .then(res =>
                  {
                        for (let i = 0; i < res.data.length; i++)
                        {
                              document.getElementById("workerList").innerHTML += "<tr>"
                                    + "<td>" + res.data[i].name + "</td>"
                                    + "<td>" + res.data[i].employeeID + "</td>"
                                    + "<td>"
                                    + "<button class = 'Workers'" + res.data[i].employeeID + "> Chi tiết </button>"
                                    + "<button class = 'Area'" + res.data[i].employeeID + "> Phân công khu vực</button>"
                                    + "<button class='WorkerDel'>Xóa</button>"
                                    + "</td>"
                                    + "<tr/>";
                        }

                        let obj = document.getElementsByClassName('WorkerDel');
                        for (let i = 0; i < res.data.length; i++)
                              obj[i].addEventListener('click', event => handleDelete(event, res.data[i].employeeID));
                        obj = document.getElementsByClassName('Workers');
                        for (let i = 0; i < res.data.length; i++)
                              obj[i].addEventListener('click', event => handleClickInfo(event, res.data[i].employeeID));
                        obj = document.getElementsByClassName('Area');
                        for (let i = 0; i < res.data.length; i++)
                              obj[i].addEventListener('click', event => taskingArea(event, res.data[i].employeeID));
                  })
                  .catch(error => console.log(error));

      }

      const renderCollectors = (event) =>
      {
            event.preventDefault();

            let setButton = document.getElementById('renderCollectors');
            setButton.style.background = "bisque";
            setButton = document.getElementById('renderJanitors');
            setButton.style.background = "antiquewhite";

            document.getElementById("workerList").innerHTML = "";

            axios.get('http://localhost:4000/workerList', {
                  params: {
                        type: 'C'
                  }
            })
                  .then(res =>
                  {
                        for (let i in res.data)
                        {
                              document.getElementById("workerList").innerHTML += "<tr>"
                                    + "<td>" + res.data[i].name + "</td>"
                                    + "<td>" + res.data[i].employeeID + "</td>"
                                    + "<td>"
                                    + "<button class = 'Workers'" + res.data[i].employeeID + "> Chi tiết </button>"
                                    + "<button class = 'Route'" + res.data[i].employeeID + "> Tạo tuyến đường</button>"
                                    + "<button class='WorkerDel'>Xóa</button>"
                                    + "</td>"
                                    + "<tr/>";
                        }

                        let obj = document.getElementsByClassName('WorkerDel');
                        for (let i = 0; i < res.data.length; i++)
                              obj[i].addEventListener('click', event => handleDelete(event, res.data[i].employeeID));
                        obj = document.getElementsByClassName('Workers');
                        for (let i = 0; i < res.data.length; i++)
                              obj[i].addEventListener('click', event => handleClickInfo(event, res.data[i].employeeID));
                        obj = document.getElementsByClassName('Route');
                        for (let i = 0; i < res.data.length; i++)
                              obj[i].addEventListener('click', event => taskingRoute(event, res.data[i].employeeID));
                  })
                  .catch(error => console.log(error));
      }

      return (
            <div class="myWorkerList">
                  <h1>Danh sách nhân viên</h1>
                  <div class="rendering">
                        <button id="renderJanitors" onClick={ renderJanitors }>Danh sách nhân viên gom rác (Janitors)</button>
                        <button id="renderCollectors" onClick={ renderCollectors }>Danh sách nhân viên chở rác (Collectors)</button>
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