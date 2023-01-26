import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import '../css/vehicleInfo.css';

export const VehicleInfo = () =>
{
      const effectRan = useRef(false);

      const currentRoute = useParams();
      const vehicleId = currentRoute.vehicleID;

      const PrintInfo = (props) =>
      {
            let link = '/routeList/' + props.routeID;
            return (
                  <>
                        <thead><h2>Mã xe: </h2> <h2 class="Props"> { props.vehicleId } </h2></thead>
                        <br />
                        <br />
                        <thead><h2>Biển số xe: </h2> <h2 class="Props">{ props.plate } </h2></thead>
                        <br />
                        <br />
                        <thead><h2>Hãng sản xuất: </h2> <h2 class="Props">{ props.brand } </h2></thead>
                        <br />
                        <br />
                        <thead><h2>Tải trọng tối đa: </h2> <h2 class="Props"> { props.maxWeight } </h2></thead>
                        <br />
                        <br />
                        <thead ><h2>Tuyến đường chỉ định: </h2> <a href={ link }> { props.routeID } </a> </thead>
                        <br />
                        <br />
                        <thead><h2>Trạng thái: </h2> <h2 class="Props">{ props.status }</h2></thead>
                        <br />
                        <br />
                  </>
            );
      }

      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('VehicleManage');
                  setColor[0].style.color = "blue";

                  axios.get('http://localhost:4000/vehicleList/detail', { params: { ID: vehicleId } })
                        .then(res =>
                        {
                              document.getElementById('pic').src = 'data:image/jpg;base64,' + res.data[0].picture;

                              const render = ReactDOM.createRoot(document.getElementById('info'));
                              render.render(<PrintInfo vehicleId={ vehicleId } plate={ res.data[0].plate } brand={ res.data[0].brand } maxWeight={ res.data[0].maxWeight } routeID={ res.data[0].routeID } status={ res.data[0].status } />);
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
                        <img id='pic' alt="Ảnh MCP" />
                  </figure>
                  <table className="Properties" id="info">
                  </table>
                  <br />
                  <br />
                  <button onClick={ handleClick }>Quay lại</button>
            </div >
      );
}