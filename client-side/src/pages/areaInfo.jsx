import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { formatDate_YYYYMMDD } from '../tools/formatDate.js';
import '../css/areaInfo.css';


export const AreaInfo = () =>
{

      const currentRoute = useParams();
      const AreaId = currentRoute.areaID;

      const effectRan = useRef(false);

      const PrintInfo = (props) =>
      {
            return (
                  <div ref={ props.callback }>
                        <thead><h2>Mã khu vực: </h2> <h2 class="Props">{ props.AreaId }</h2></thead>
                        <br />
                        <br />

                        <thead>
                              <h2>MCP: </h2>
                              <div class="Props" id="printMCP" />
                        </thead>

                        <br />
                        <br />

                        <thead>
                              <h2>Tên đường: </h2>
                              <div class="Props" id="printStreet" />
                        </thead>

                        <br />
                        <br />

                        <thead>
                              <h2>Công nhân đảm nhận: </h2>
                              <div class="Props" id="printJanitor" />
                        </thead>
                        <br />
                  </div>
            );
      }

      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('AreaManage');
                  setColor[0].style.color = "blue";

                  let shift, current = new Date();
                  if (current.getHours() < 12) shift = 1;
                  else if (current.getHours() < 18) shift = 2;
                  else shift = 3;

                  axios.get('http://localhost:4000/areaList/info', { params: { ID: AreaId, date: formatDate_YYYYMMDD(current), shift: shift } })
                        .then(res =>
                        {
                              const render = ReactDOM.createRoot(document.getElementById('info'));
                              render.render(<PrintInfo AreaId={ AreaId } callback={ () =>
                              {
                                    if (res.data[0].length)
                                    {
                                          let temp_mcp = [];
                                          let temp_street = [];
                                          let link;
                                          for (let i = 0; i < res.data[0].length - 1; i++)
                                          {
                                                link = "../mcpList/" + res.data[0][i].mcpID;
                                                temp_mcp.push(<><a href={ link } > { res.data[0][i].mcpID } </a> <> - </></>);


                                                temp_street.push(<>{ res.data[0][i].address } - </>);
                                          }
                                          link = "../mcpList/" + res.data[0][res.data[0].length - 1].mcpID;
                                          temp_mcp.push(<a href={ link } > { res.data[0][res.data[0].length - 1].mcpID } </a>);
                                          let render_mcp = ReactDOM.createRoot(document.getElementById('printMCP'));
                                          render_mcp.render(<>{ temp_mcp }</>);

                                          temp_street.push(<>{ res.data[0][res.data[0].length - 1].address }</>);
                                          let render_street = ReactDOM.createRoot(document.getElementById('printStreet'));
                                          render_street.render(<>{ temp_street }</>);
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
                                          let render_worker = ReactDOM.createRoot(document.getElementById('printJanitor'));
                                          render_worker.render(<>{ temp_worker }</>);
                                    }
                              }
                              } />);
                        })
                        .catch(error => console.log(error));

                  axios.get('http://localhost:4000/areaList/current_worker', { params: { date: formatDate_YYYYMMDD(current), shift: shift, ID: AreaId } })
                        .then(res =>
                        {
                              let temp = [];
                              for (let i = 0; i < res.data.length - 1; i++)
                              {
                                    let link = "../workerList/" + res.data[i].employeeID;
                                    temp.push(<><a href={ link }>{ res.data[i].employeeID }</a> <> - </></>);
                              }
                              let link = "../workerList/" + res.data[res.data.length - 1].employeeID;
                              temp.push(<a href={ link }>{ res.data[res.data.length - 1].employeeID }</a>);
                              let render = ReactDOM.createRoot(document.getElementById('printJanitor'));
                              render.render(<>{ temp }</>);
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
            <div className="AreaID">
                  <h1>Thông tin chi tiết khu vực</h1>
                  <br />
                  <table className="Properties" id="info">
                  </table>
                  <br />
                  <br />
                  <button onClick={ handleClick }>Quay lại</button>
            </div >
      );
}