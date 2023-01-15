import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import '../css/vehicleInfo.css';
import vehicleList from '../data/vehicle.js';

export const VehicleInfo = () =>
{

      const effectRan = useRef(false);

      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('VehicleManage');
                  setColor[0].style.color = "blue";
                  effectRan.current = true;
            }
      });

      const currentRoute = useParams();
      const vehicleId = currentRoute.vehiclexx;
      let brand, weight, latest, picture, licensePlate, route;

      for (let key in vehicleList)
      {
            if (vehicleList[key].ma === vehicleId)
            {
                  picture = vehicleList[key].linkAnh;
                  brand = vehicleList[key].hang;
                  weight = vehicleList[key].taitrong;
                  latest = vehicleList[key].trangthai;
                  licensePlate = vehicleList[key].bienso;
                  route = vehicleList[key].tuyenduongphutrach;
                  break;
            }
      }

      const Navigate = useNavigate();

      const handleClick = (event) =>
      {
            event.preventDefault();
            Navigate(-1);
      }

      const routeInfo = '/sideMenu/routeList/' + route;

      return (
            <div className="vehicleID">
                  <h1>Thông tin kỹ thuật</h1>
                  <br />
                  <figure>
                        <img src='https://webexample75.files.wordpress.com/2022/12/20181029_081532_grande.jpg' alt="Ảnh MCP" />
                  </figure>
                  <table className="Properties">
                        <thead><h2>MÃ XE: </h2> <h2 class="Props">{ vehicleId }</h2></thead>
                        <br />
                        <thead><h2>BIỂN SỐ: </h2> <h2 class="Props">{ licensePlate }</h2></thead>
                        <br />
                        <thead><h2>HÃNG: </h2> <h2 class="Props">{ brand }</h2></thead>
                        <br />
                        <thead><h2>TẢI TRỌNG: </h2> <h2 class="Props">{ weight }</h2></thead>
                        <br />
                        <thead ><h2>TUYẾN ĐƯỜNG PHỤ TRÁCH: </h2> <a href={ routeInfo }>{ route } </a> </thead>
                        <br />
                        <thead><h2>TRẠNG THÁI: </h2> <h2 class="Props">{ latest }</h2></thead>
                        <br />
                  </table>
                  <br />
                  <br />
                  <button onClick={ handleClick }>Quay lại</button>
            </div >
      );
}