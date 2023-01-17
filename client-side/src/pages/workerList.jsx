import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
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

      const taskingArea = (event, employeeID) =>
      {
            event.preventDefault();
            let target = event.currentTarget.id.substring(5);
            Navigate("./" + target + "/taskScheduleJanitor");
      }

      const JanitorRow = (props) =>
      {
            return (
                  <tr>
                        <td> { props.name }</td>
                        <td> { props.employeeID } </td>
                        <td>
                              <button class='Workers' onClick={ (event) => handleClickInfo(event, props.employeeID) }> Chi tiết </button>
                              <button class='Area' onClick={ (event) => taskingArea(event, props.employeeID) }> Phân công khu vực</button>
                              <button class='WorkerDel' onClick={ event => handleDelete(event, props.employeeID) }>Xóa</button>
                        </td >
                  </tr >
            );
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
                        let temp = [];
                        for (let i = 0; i < res.data.length; i++)
                              temp.push(<JanitorRow name={ res.data[i].name } employeeID={ res.data[i].employeeID } />);
                        const render = ReactDOM.createRoot(document.getElementById('workerList'));
                        render.render(<>{ temp }</>);
                  })
                  .catch(error => console.log(error));

      }

      const taskingRoute = (event, employeeID) =>
      {
            event.preventDefault();
            let target = event.currentTarget.id.substring(6);
            Navigate("./" + target + "/taskScheduleCollector");
      }

      const CollectorRow = (props) =>
      {
            return (
                  <tr>
                        <td> { props.name }</td>
                        <td> { props.employeeID } </td>
                        <td>
                              <button class='Workers' onClick={ (event) => handleClickInfo(event, props.employeeID) }>Chi tiết </button>
                              <button class='Route' onClick={ (event) => taskingRoute(event, props.employeeID) }>Tạo tuyến đường</button>
                              <button class='WorkerDel' onClick={ event => handleDelete(event, props.employeeID) }>Xóa</button>
                        </td >
                  </tr >
            );
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
                        let temp = [];
                        for (let i in res.data)
                              temp.push(<CollectorRow name={ res.data[i].name } employeeID={ res.data[i].employeeID } />);
                        const render = ReactDOM.createRoot(document.getElementById('workerList'));
                        render.render(<>{ temp }</>);
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