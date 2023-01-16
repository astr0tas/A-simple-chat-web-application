import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import '../css/areaInfo.css';
import areaList, { baseMCPPath, baseWorkerPath } from '../data/area.js';


export const AreaInfo = () =>
{

      const currentRoute = useParams();
      const AreaId = currentRoute.areaID;

      const effectRan = useRef(false);

      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('AreaManage');
                  setColor[0].style.color = "blue";

                  for (let key in areaList)
                  {
                        if (areaList[key].ma === AreaId)
                        {
                              mcps = areaList[key].cacmcp;
                              streets = areaList[key].tenduong;
                              if (areaList[key].congnhan.length !== 0)
                              {
                                    let i = 0;
                                    for (i; i < areaList[key].congnhan.length - 1; i++)
                                          document.getElementById('printWorkerList').innerHTML += "<a href=\"" + baseWorkerPath + areaList[key].congnhan[i] + "\">" + areaList[key].congnhan[i] + "</a>"
                                                + "<h2 class=\"Props\">,   </h2>";
                                    document.getElementById('printWorkerList').innerHTML += "<a href=\"" + baseWorkerPath + areaList[key].congnhan[i] + "\">" + areaList[key].congnhan[i] + "</a>";
                              }

                              if (areaList[key].cacmcp.length !== 0)
                              {
                                    let i = 0;
                                    for (i = 0; i < areaList[key].cacmcp.length - 1; i++)
                                          document.getElementById('printMCPList').innerHTML += "<a href=\"" + baseMCPPath + areaList[key].cacmcp[i] + "\">" + areaList[key].cacmcp[i] + "</a>"
                                                + "<h2 class=\"Props\">,   </h2>";
                                    document.getElementById('printMCPList').innerHTML += "<a href=\"" + baseMCPPath + areaList[key].cacmcp[i] + "\">" + areaList[key].cacmcp[i] + "</a>";
                              }
                              break;
                        }
                  }

                  effectRan.current = true;
            }
      });

      var mcps, streets;

      for (let key in areaList)
      {
            if (areaList[key].ma === AreaId)
            {
                  mcps = areaList[key].cacmcp;
                  streets = areaList[key].tenduong;
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
            <div className="AreaID">
                  <h1>Thông tin chi tiết khu vực</h1>
                  <br />
                  <table className="Properties">
                        <thead><h2>Mã khu vực: </h2> <h2 class="Props">{ AreaId }</h2></thead>
                        <br />
                        <thead>
                              <h2>Các MCPs: </h2>
                              <div id="printMCPList" />
                        </thead>
                        <br />
                        <thead><h2>Tên đường: </h2> <h2 class="Props">{ streets }</h2></thead>
                        <br />
                        <thead>
                              <h2>Công nhân đảm nhận: </h2>
                              <div id="printWorkerList" />
                        </thead>
                        <br />
                  </table>
                  <br />
                  <br />
                  <button onClick={ handleClick }>Quay lại</button>
            </div >
      );
}