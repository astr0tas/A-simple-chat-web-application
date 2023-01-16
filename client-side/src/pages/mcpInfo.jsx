import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { formatDate } from '../data/formatDate.js';
import '../css/mcpInfo.css';


export const MCPInfo = () =>
{
      const effectRan = useRef(false);

      const currentURL = useParams();
      const MCPId = currentURL.mcpID;

      const [address, setAddress] = useState();
      const [maximumCap, setMaximumCap] = useState();
      const [currentCap, setCurrentCap] = useState();
      const [latestCollectedDay, setLatestCollectedDay] = useState();
      const [picture, setPicture] = useState();
      const [routeID, setRouteID] = useState();
      const [areaID, setAreaID] = useState();

      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('MCPManage');
                  setColor[0].style.color = "blue";

                  axios.get('http://localhost:4000/mcpList/detail', { params: { ID: MCPId } })
                        .then(res =>
                        {
                              setAddress(res.data[0].address);
                              setMaximumCap(res.data[0].maximumCap);
                              setCurrentCap(res.data[0].currentCap);
                              setLatestCollectedDay(formatDate(new Date(Date.parse(res.data[0].latestCollectedDay))));
                              setPicture(res.data[0].picture.data);
                              setRouteID(res.data[0].routeID);
                              setAreaID(res.data[0].areaID);
                        })
                        .catch(error => console.log(error));

                  effectRan.current = true;
            }
      });

      // for (let key in mcpList)
      // {
      //       if (mcpList[key].ma === MCPId)
      //       {
      //             address = mcpList[key].diaChi;
      //             maximumCap = mcpList[key].sucChuaToiDa;
      //             currentCap = mcpList[key].sucChuaHienTai;
      //             latest = mcpList[key].lanThuGomGanDay;
      //             picture = mcpList[key].anh;
      //             break;
      //       }
      // }

      const Navigate = useNavigate();

      const handleClick = (event) =>
      {
            event.preventDefault();
            Navigate(-1);
      }

      return (
            <div className="MCPID">
                  <h1>Thông tin chi tiết MCP</h1>
                  <br />
                  <figure >
                        <img src={ picture } alt="Ảnh MCP" />
                  </figure>
                  <table className="Properties">
                        <thead><h2>MCP ID: </h2> <h2 class="Props">{ MCPId }</h2></thead>
                        <br />
                        <thead><h2>Địa chỉ: </h2> <h2 class="Props">{ address }</h2></thead>
                        <br />
                        <thead><h2>Sức chứa tối đa: </h2> <h2 class="Props">{ maximumCap } tấn</h2></thead>
                        <br />
                        <thead><h2>Sức chứa hiện tại: </h2> <h2 class="Props">{ currentCap } tấn</h2></thead>
                        <br />
                        <thead><h2>Ngày thu gom gần đây nhất: </h2> <h2 class="Props">{ latestCollectedDay }</h2></thead>
                        <br />
                  </table>
                  <br />
                  <br />
                  <button onClick={ handleClick }>Quay lại</button>
            </div >
      );
}