import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/mcpList.css';
import mcpList from '../data/mcps.js';

export const MCPList = () =>
{
      const effectRan = useRef(false);

      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('MCPManage');
                  setColor[0].style.color = "blue";

                  for (let key in mcpList)
                  {
                        document.getElementById("MCPList").innerHTML += "<tr>"
                              + "<td>" + mcpList[key].ma + "</td>"
                              + "<td>" + mcpList[key].diaChi + "</td>"
                              + "<td>" + Math.ceil(mcpList[key].sucChuaHienTai / mcpList[key].sucChuaToiDa * 100) + "%" + "</td>"
                              + "<td>"
                              + "<button class = 'MCPs' id =" + mcpList[key].ma + "> Chi tiết </button>"
                              + "<button class='MCPDel'>Xóa</button>"
                              + "</td>"
                              + "<tr/>";
                  }
                  let obj = document.getElementsByClassName('MCPDel');
                  for (let i = 0; i < obj.length; i++)
                        obj[i].addEventListener('click', handleClickNotDev);
                  obj = document.getElementsByClassName('MCPs');
                  for (let i = 0; i < obj.length; i++)
                        obj[i].addEventListener('click', handleClickInfo);
                  effectRan.current = true;
            }
      });

      const Navigate = useNavigate();

      const handleClickNotDev = (event) =>
      {
            event.preventDefault();
            Navigate("/sideMenu/inDev");
      }

      const handleClickInfo = (event) =>
      {
            event.preventDefault();
            Navigate("./" + event.currentTarget.id);
      }

      return (
            <div class="myMCPList">
                  <h1>Danh sách MCP</h1>
                  <table>
                        <thead>
                              <tr>
                                    <th><h3>Mã MCP</h3></th>
                                    <th><h3>Địa chỉ</h3></th>
                                    <th><h3>Tình trạng</h3></th>
                                    <th><h3>Thao tác</h3></th>
                              </tr>
                        </thead>
                        <tbody id="MCPList"/>
                  </table>
                  <br />
                  <br />
                  <view>
                        <button onClick={ handleClickNotDev }>Thêm MCP</button>
                  </view>
            </div>
      );
}