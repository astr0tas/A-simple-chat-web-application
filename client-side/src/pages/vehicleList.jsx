import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/vehicleList.css';


export const VehicleList = () =>
{
      const effectRan = useRef(false);

      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('VehicleManage');
                  setColor[0].style.color = "blue";

                  axios.get('http://localhost:4000/vehicleList')
                        .then(res =>
                        {
                              for (let i in res.data)
                              {
                                    document.getElementById("vehicleList").innerHTML += "<tr>"
                                          + "<td>" + res.data[i].vehicleID + "</td>"
                                          + "<td>" + res.data[i].status + "</td>"
                                          + "<td>"
                                          + "<button class = 'Vehicles' id =" + res.data[i].vehicleID + "> Chi tiết </button>"
                                          + "<button class='VehicleDel'>Xóa</button>"
                                          + "</td>"
                                          + "<tr/>";
                              }
                              let obj = document.getElementsByClassName('VehicleDel');
                              for (let i = 0; i < obj.length; i++)
                                    obj[i].addEventListener('click', handleClickNotDev);
                              obj = document.getElementsByClassName('Vehicles');
                              for (let i = 0; i < obj.length; i++)
                                    obj[i].addEventListener('click', handleClickInfo);
                        })
                        .catch(error => console.log(error));

                  effectRan.current = true;
            }

      });

      const Navigate = useNavigate();

      const handleClickNotDev = (event) =>
      {
            event.preventDefault();
            Navigate("/inDev");
      }

      const handleClickInfo = (event) =>
      {
            event.preventDefault();
            Navigate("./" + event.currentTarget.id);
      }

      return (
            <div class="myVehicleList">
                  <h1>Danh sách Xe</h1>
                  <table>
                        <thead>
                              <tr>
                                    <th><h3>MÃ XE</h3></th>
                                    <th><h3>TRẠNG THÁI</h3></th>
                                    <th><h3>TÁC VỤ</h3></th>
                              </tr>
                        </thead>
                        <tbody id="vehicleList">
                        </tbody>
                  </table>
                  <br />
                  <br />
                  <view>
                        <button onClick={ handleClickNotDev }>Thêm xe</button>
                  </view>
            </div>
      );
}