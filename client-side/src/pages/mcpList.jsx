import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import '../css/mcpList.css';

export const MCPList = () =>
{
      const effectRan = useRef(false);

      const MCPRow = (props) =>
      {
            return (
                  <tr>
                        <td>{ props.mcpID } </td>
                        <td>{ props.address }</td>
                        <td>{ Math.ceil(props.currentCap / props.maximumCap * 100) }%</td>
                        <td>
                              <button class='MCPs' onClick={ event => handleClickInfo(event, props.mcpID) }> Chi tiết </button>
                              <button class='MCPDel' onClick={ event => handleDelete(event, props.mcpID) }>Xóa</button>
                        </td>
                  </tr>
            );
      }

      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('MCPManage');
                  setColor[0].style.color = "blue";

                  axios.get('http://localhost:4000/mcpList')
                        .then(res =>
                        {
                              let temp = [];
                              for (let i in res.data)
                                    temp.push(<MCPRow mcpID={ res.data[i].mcpID } address={ res.data[i].address } currentCap={ res.data[i].currentCap } maximumCap={ res.data[i].maximumCap } />);
                              const render = ReactDOM.createRoot(document.getElementById('MCPList'));
                              render.render(<>{ temp }</>);
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

      const handleDelete = (event, mcpID) =>
      {
            event.preventDefault();
            axios.delete('http://localhost:4000/mcpList/delete', { params: { ID: mcpID } })
                  .then(res =>
                  {
                        window.alert(res.data.message);
                        window.location.reload();

                  })
                  .catch(error => console.log(error));
      }

      const handleClickInfo = (event, mcpID) =>
      {
            event.preventDefault();
            Navigate("./" + mcpID);
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