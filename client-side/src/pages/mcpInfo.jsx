import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { formatDate_DDMMYYYY } from '../tools/formatDate.js';
import '../css/mcpInfo.css';


export const MCPInfo = () =>
{
      const effectRan = useRef(false);

      const currentURL = useParams();
      const MCPId = currentURL.mcpID;

      const PrintInfo = (props) =>
      {
            return (
                  <>
                        <thead><h2>MCP ID: </h2> <h2 class="Props">{ props.MCPId } </h2></thead>
                        <br />
                        <br />
                        <thead><h2>Địa chỉ: </h2> <h2 class="Props">{ props.address } </h2></thead>
                        <br />
                        <br />
                        <thead><h2>Sức chứa tối đa: </h2> <h2 class="Props">{ props.maximumCap } tấn</h2></thead>
                        <br />
                        <br />
                        <thead><h2>Sức chứa hiện tại: </h2> <h2 class="Props">{ props.currentCap } tấn</h2></thead>
                        <br />
                        <br />
                        <thead><h2>Ngày thu gom gần đây nhất: </h2> <h2 class="Props">{ props.date }</h2></thead>
                        <br />
                        <br />
                  </>
            );
      }

      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('MCPManage');
                  setColor[0].style.color = "blue";

                  axios.get('http://localhost:4000/mcpList/detail', { params: { ID: MCPId } })
                        .then(res =>
                        {
                              const data = new Uint8Array(res.data[0].picture.data);
                              const blob = new Blob([data], { type: "image/png" });
                              const url = URL.createObjectURL(blob);
                              document.getElementById('pic').src = url;

                              const render = ReactDOM.createRoot(document.getElementById('info'));
                              render.render(<PrintInfo MCPId={ MCPId } address={ res.data[0].address } maximumCap={ res.data[0].maximumCap } currentCap={ res.data[0].currentCap } date={ formatDate_DDMMYYYY(new Date(Date.parse(res.data[0].latestCollectedDay))) } />);
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
            <div className="MCPID">
                  <h1>Thông tin chi tiết MCP</h1>
                  <br />
                  <img id="pic" alt="Ảnh MCP" />

                  <table className="Properties" id="info">
                  </table>
                  <br />
                  <br />
                  <button onClick={ handleClick }>Quay lại</button>
            </div >
      );
}