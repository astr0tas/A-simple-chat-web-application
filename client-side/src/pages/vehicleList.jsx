import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import '../css/vehicleList.css';


export const VehicleList = () =>
{
      const effectRan = useRef(false);

      const VehicleRow = (props) =>
      {
            return (
                  <>
                        <tr>
                              <td> { props.vehicleID } </td>
                              <td> { props.status } </td>
                              <td>
                                    <button class='Vehicles' onClick={ event => handleClickInfo(event, props.vehicleID) }> Chi tiết </button>
                                    <button class='VehicleDel' onClick={ event => handleDelete(event, props.vehicleID) }>Xóa</button>
                              </td>
                        </tr >
                  </>
            );
      }

      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('VehicleManage');
                  setColor[0].style.color = "blue";

                  axios.get('http://localhost:4000/vehicleList')
                        .then(res =>
                        {
                              let temp = [];
                              for (let i in res.data)
                                    temp.push(<VehicleRow vehicleID={ res.data[i].vehicleID } status={ res.data[i].status } />);
                              const render = ReactDOM.createRoot(document.getElementById('vehicleList'));
                              render.render(<>{ temp }</>);
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