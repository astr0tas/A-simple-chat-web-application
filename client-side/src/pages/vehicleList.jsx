import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/vehicleList.css';
import vehicleList from '../data/vehicle.js';


export const VehicleList = () =>
{
      const effectRan = useRef(false);

      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('VehicleManage');
                  setColor[0].style.color = "blue";

                  for (let key in vehicleList)
                  {
                        document.getElementById("vehicleList").innerHTML += "<tr>"
                              + "<td>" + vehicleList[key].ma + "</td>"
                              + "<td>" + vehicleList[key].trangthai + "</td>"
                              + "<td>"
                              + "<button class = 'Vehicles' id =" + vehicleList[key].ma + "> Chi tiết </button>"
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