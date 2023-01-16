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
                                          + "<button class = 'Vehicles'" + res.data[i].vehicleID + "> Chi tiết </button>"
                                          + "<button class='VehicleDel'>Xóa</button>"
                                          + "</td>"
                                          + "<tr/>";
                              }
                              let obj = document.getElementsByClassName('VehicleDel');
                              for (let i = 0; i < res.data.length; i++)
                                    obj[i].addEventListener('click', event => handleDelete(event, res.data[i].vehicleID));
                              obj = document.getElementsByClassName('Vehicles');
                              for (let i = 0; i < res.data.length; i++)
                                    obj[i].addEventListener('click', event => handleClickInfo(event, res.data[i].vehicleID));
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

      const handleDelete = (event, vehicleID) =>
      {
            event.preventDefault();

            axios.delete('http://localhost:4000/vehicleList/delete', { params: { ID: vehicleID } })
                  .then(res =>
                  {
                        window.alert(res.data.message);
                        window.location.reload();
                  })
                  .catch(error => console.log(error));
      }

      const handleClickInfo = (event, vehicleID) =>
      {
            event.preventDefault();
            Navigate("./" + vehicleID);
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