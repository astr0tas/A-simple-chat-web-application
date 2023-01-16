import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import '../css/routeInfo.css';
import routeList, { baseMCPPath, baseVehiclePath, baseWorkerPath } from '../data/route.js';


export const RouteInfo = () =>
{
      const currentRoute = useParams();
      const RouteId = currentRoute.routeID;

      const effectRan = useRef(false);

      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('RouteManage');
                  setColor[0].style.color = "blue";

                  for (let key in routeList)
                  {
                        if (routeList[key].ma === RouteId)
                        {
                              if (routeList[key].congnhan.length !== 0)
                              {
                                    let i = 0;
                                    for (i; i < routeList[key].congnhan.length - 1; i++)
                                          document.getElementById('printWorkerList').innerHTML += "<a href=\"" + baseWorkerPath + routeList[key].congnhan[i] + "\">" + routeList[key].congnhan[i] + "</a>"
                                                + "<h2 class=\"Props\">,   </h2>";
                                    document.getElementById('printWorkerList').innerHTML += "<a href=\"" + baseWorkerPath + routeList[key].congnhan[i] + "\">" + routeList[key].congnhan[i] + "</a>";
                              }
                              if (routeList[key].cacmcp.length !== 0)
                              {
                                    let i = 0;
                                    for (i = 0; i < routeList[key].cacmcp.length - 1; i++)
                                          document.getElementById('printMCPList').innerHTML += "<a href=\"" + baseMCPPath + routeList[key].cacmcp[i] + "\">" + routeList[key].cacmcp[i] + "</a>"
                                                + "<h2 class=\"Props\">,   </h2>";
                                    document.getElementById('printMCPList').innerHTML += "<a href=\"" + baseMCPPath + routeList[key].cacmcp[i] + "\">" + routeList[key].cacmcp[i] + "</a>";
                              }
                              break;
                        }
                  }

                  effectRan.current = true;
            }
      });

      let streets, vehicle;

      for (let key in routeList)
      {

            if (routeList[key].ma === RouteId)
            {
                  streets = routeList[key].tenduong;
                  vehicle = routeList[key].xe;
                  break;
            }

      }

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
                  <table className="Properties">
                        <thead><h2>Mã tuyến: </h2> <h2 class="Props">{ RouteId }</h2></thead>
                        <br />
                        <thead>
                              <h2>MCP: </h2>
                              <div id="printMCPList" />
                        </thead>
                        <br />
                        <thead><h2>Tên đường: </h2> <h2 class="Props">{ streets }</h2></thead>
                        <br />
                        <thead><h2>Xe: </h2> <a href={ baseVehiclePath + vehicle }>{ vehicle }</a></thead>
                        <br />
                        <thead>
                              <h2>Công nhân đảm nhận: </h2>
                              <div id="printWorkerList" />
                        </thead>
                        <br />
                        <tbody id="RouteID"></tbody>
                  </table>
                  <br />
                  <br />
                  <button onClick={ handleClick }>Quay lại</button>
            </div >
      );
}