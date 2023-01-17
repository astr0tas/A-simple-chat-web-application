import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { formatDate_YYYYMMDD } from '../tools/formatDate.js';
import '../css/routeInfo.css';


export const RouteInfo = () =>
{
      const currentRoute = useParams();
      const RouteId = currentRoute.routeID;

      const effectRan = useRef(false);

      const PrintInfo = (props) =>
      {
            return (
                  <div ref={ props.callback }>
                        <thead><h2>Mã tuyến: </h2> <h2 class="Props"> { props.RouteId } </h2></thead>
                        <br />
                        <br />

                        <thead>
                              <h2>MCP: </h2>
                              <div class="Props" id="printMCP" />
                        </thead>

                        <br />
                        <br />

                        <thead>
                              <h2> Tên đường: </h2>
                              <div class="Props" id="printStreet" />
                        </thead >

                        <br />
                        <br />

                        <thead>
                              <h2> Xe: </h2>
                              <div class="Props" id="printVehicle" />
                        </thead >

                        <br />
                        <br />

                        <thead>
                              <h2>Công nhân đảm nhận: </h2>
                              <div class="Props" id="printCollector" />
                        </thead>

                        <br />
                        <br />
                  </div>
            );
      }

      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('RouteManage');
                  setColor[0].style.color = "blue";

                  let shift, current = new Date();
                  if (current.getHours() < 12) shift = 1;
                  else if (current.getHours() < 18) shift = 2;
                  else shift = 3;

                  axios.get('http://localhost:4000/routeList/info', { params: { ID: RouteId, date: formatDate_YYYYMMDD(current), shift: shift } })
                        .then(res =>
                        {
                              console.log(res);
                              const render = ReactDOM.createRoot(document.getElementById('info'));
                              render.render(<PrintInfo RouteId={ RouteId } callback={ () =>
                              {
                                    if (res.data[0].length)
                                    {
                                          let temp_mcp = [];
                                          let temp_street = [];
                                          let temp_vehicle = [];
                                          let link;

                                          for (let i = 0; i < res.data[0].length - 1; i++)
                                          {
                                                link = "../mcpList/" + res.data[0][i].mcpID;
                                                temp_mcp.push(<><a href={ link } > { res.data[0][i].mcpID } </a> <> - </></>);


                                                temp_street.push(<>{ res.data[0][i].address } - </>);

                                                link = "../vehicleList/" + res.data[0][i].vehicleID;
                                                temp_vehicle.push(<><a href={ link }>{ res.data[0][i].vehicleID }</a> <> - </></>);
                                          }
                                          link = "../mcpList/" + res.data[0][res.data[0].length - 1].mcpID;
                                          temp_mcp.push(<a href={ link } > { res.data[0][res.data[0].length - 1].mcpID } </a>);
                                          let render_mcp = ReactDOM.createRoot(document.getElementById('printMCP'));
                                          render_mcp.render(<>{ temp_mcp }</>);

                                          temp_street.push(<>{ res.data[0][res.data[0].length - 1].address }</>);
                                          let render_street = ReactDOM.createRoot(document.getElementById('printStreet'));
                                          render_street.render(<>{ temp_street }</>);

                                          link = "../vehicleList/" + res.data[0][res.data[0].length - 1].vehicleID;
                                          temp_vehicle.push(<a href={ link } > { res.data[0][res.data[0].length - 1].vehicleID } </a>);
                                          let render_vehicle = ReactDOM.createRoot(document.getElementById('printVehicle'));
                                          render_vehicle.render(<>{ temp_vehicle }</>);
                                    }

                                    if (res.data[1].length)
                                    {
                                          let temp_worker = [];
                                          for (let i = 0; i < res.data[1].length - 1; i++)
                                          {
                                                let link = "../workerList/" + res.data[1][i].employeeID;
                                                temp_worker.push(<><a href={ link }>{ res.data[1][i].employeeID }</a> <> - </></>);
                                          }
                                          let link = "../workerList/" + res.data[1][res.data[1].length - 1].employeeID;
                                          temp_worker.push(<a href={ link }>{ res.data[1][res.data[1].length - 1].employeeID }</a>);
                                          let render_worker = ReactDOM.createRoot(document.getElementById('printCollector'));
                                          render_worker.render(<>{ temp_worker }</>);
                                    }
                              } } />);
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
            <div className="RouteID">
                  <h1>Thông tin chi tiết tuyến đường</h1>
                  <br />
                  <table className="Properties" id="info">
                  </table>
                  <br />
                  <br />
                  <button onClick={ handleClick }>Quay lại</button>
            </div >
      );
}