import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import '../css/areaInfo.css';


export const AreaInfo = () =>
{

      const currentRoute = useParams();
      const AreaId = currentRoute.areaID;

      const effectRan = useRef(false);

      const PrintInfo = (props) =>
      {
            return (
                  <>
                        <thead><h2>Mã khu vực: </h2> <h2 class="Props">{ props.AreaId }</h2></thead>
                        <br />
                        <br />

                        <thead>
                              <h2>Các MCPs: </h2>
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
                  </>
            );
      }

      useEffect(() =>
      {
            if (effectRan.current === false)
            {
                  let setColor = document.getElementsByClassName('AreaManage');
                  setColor[0].style.color = "blue";

                  const render = ReactDOM.createRoot(document.getElementById('info'));
                  render.render(<PrintInfo AreaId={ AreaId } />);

                  axios.get('http://localhost:4000/areaList/raw_info', { params: { ID: AreaId } })
                        .then(res =>
                        {
                              let temp_mcp = [];
                              let temp_street = [];
                              let link;
                              for (let i = 0; i < res.data.length - 1; i++)
                              {
                                    link = "../mcpList/" + res.data[i].mcpID;
                                    temp_mcp.push(<><a href={ link } > { res.data[i].mcpID } </a> <> - </></>);


                                    temp_street.push(<>{ res.data[i].address } - </>);
                              }
                              link = "../mcpList/" + res.data[res.data.length - 1].mcpID;
                              temp_mcp.push(<a href={ link } > { res.data[res.data.length - 1].mcpID } </a>);
                              let render_mcp = ReactDOM.createRoot(document.getElementById('printMCP'));
                              render_mcp.render(<>{ temp_mcp }</>);

                              temp_street.push(<>{ res.data[res.data.length - 1].address }</>);
                              let render_street = ReactDOM.createRoot(document.getElementById('printStreet'));
                              render_street.render(<>{ temp_street }</>);
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