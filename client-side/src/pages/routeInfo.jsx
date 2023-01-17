import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import '../css/routeInfo.css';


export const RouteInfo = () =>
{
      const currentRoute = useParams();
      const RouteId = currentRoute.routeID;

      const effectRan = useRef(false);

      const PrintInfo = (props) =>
      {
            return (
                  <>
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
                  </>
            );
      }

      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('RouteManage');
                  setColor[0].style.color = "blue";

                  const render = ReactDOM.createRoot(document.getElementById('info'));
                  render.render(<PrintInfo RouteId={ RouteId } />);

                  axios.get('http://localhost:4000/routeList/raw_info', { params: { ID: RouteId } })
                        .then(res =>
                        {
                              let temp_mcp = [];
                              let temp_street = [];
                              let temp_vehicle = [];
                              let link;
                              for (let i = 0; i < res.data.length - 1; i++)
                              {
                                    link = "../mcpList/" + res.data[i].mcpID;
                                    temp_mcp.push(<><a href={ link } > { res.data[i].mcpID } </a> <> - </></>);


                                    temp_street.push(<>{ res.data[i].address } - </>);

                                    link = "../vehicleList/" + res.data[i].vehicleID;
                                    temp_vehicle.push(<><a href={ link }>{ res.data[i].vehicleID }</a> <> - </></>);
                              }
                              link = "../mcpList/" + res.data[res.data.length - 1].mcpID;
                              temp_mcp.push(<a href={ link } > { res.data[res.data.length - 1].mcpID } </a>);
                              let render_mcp = ReactDOM.createRoot(document.getElementById('printMCP'));
                              render_mcp.render(<>{ temp_mcp }</>);

                              temp_street.push(<>{ res.data[res.data.length - 1].address }</>);
                              let render_street = ReactDOM.createRoot(document.getElementById('printStreet'));
                              render_street.render(<>{ temp_street }</>);

                              link = "../vehicleList/" + res.data[res.data.length - 1].vehicleID;
                              temp_vehicle.push(<a href={ link } > { res.data[res.data.length - 1].vehicleID } </a>);
                              let render_vehicle = ReactDOM.createRoot(document.getElementById('printVehicle'));
                              render_vehicle.render(<>{ temp_vehicle }</>);
                        })
                        .catch(error => console.log(error));

                  //to be continued

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