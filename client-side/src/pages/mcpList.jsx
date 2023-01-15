import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/mcpList.css';

export const MCPList = () =>
{
      const effectRan = useRef(false);

      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('MCPManage');
                  setColor[0].style.color = "blue";

                  axios.get('http://localhost:4000/mcpList')
                        .then(res =>
                        {
                              for (let i in res.data)
                              {
                                    document.getElementById("MCPList").innerHTML += "<tr>"
                                          + "<td>" + res.data[i].mcpID + "</td>"
                                          + "<td>" + res.data[i].address + "</td>"
                                          + "<td>" + Math.ceil(res.data[i].currentCap / res.data[i].maximumCap * 100) + "%" + "</td>"
                                          + "<td>"
                                          + "<button class = 'MCPs' id =" + res.data[i].mcpID + "> Chi tiết </button>"
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
                        <tbody id="MCPList" />
                  </table>
                  <br />
                  <br />
                  <view>
                        <button onClick={ handleClickNotDev }>Thêm MCP</button>
                  </view>
            </div>
      );
}