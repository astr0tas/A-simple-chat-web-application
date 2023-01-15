import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../css/vehicleInfo.css';

export const VehicleInfo = () =>
{
      const effectRan = useRef(false);

      const currentRoute = useParams();
      const vehicleId = currentRoute.vehicleID;

      const [brand, setBrand] = useState();
      const [weight, setWeight] = useState();
      const [status, setStatus] = useState();
      const [licensePlate, setLicensePlate] = useState();
      const [route, setRoute] = useState();


      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('VehicleManage');
                  setColor[0].style.color = "blue";

                  axios.get('http://localhost:4000/vehicleList/detail', { params: { ID: vehicleId } })
                        .then(res =>
                        {
                              setBrand(res.data[0].brand);
                              setWeight(res.data[0].maxWeight);
                              setStatus(res.data[0].status);
                              setLicensePlate(res.data[0].plate);
                              setRoute(res.data[0].routeID);
                        })
                        .catch(error => console.log(error));

                  effectRan.current = true;
            }
      });

      const Navigate = useNavigate();

      const handleClick = (event) =>
      {
            event.preventDefault();
            Navigate(-1);
      }

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
                        <thead ><h2>TUYẾN ĐƯỜNG PHỤ TRÁCH: </h2> <a href={ '/routeList/' + route }>{ route } </a> </thead>
                        <br />
                        <thead><h2>TRẠNG THÁI: </h2> <h2 class="Props">{ status }</h2></thead>
                        <br />
                  </table>
                  <br />
                  <br />
                  <button onClick={ handleClick }>Quay lại</button>
            </div >
      );
}