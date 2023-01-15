import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/routeList.css';

export const RouteList = () =>
{
    const effectRan = useRef(false);

    useEffect(() =>
    {
        if (effectRan.current === false)
        {
            let setColor = document.getElementsByClassName('RouteManage');
            setColor[0].style.color = "blue";

            axios.get('http://localhost:4000/routeList')
                .then(res =>
                {
                    for (let i in res.data)
                    {
                        document.getElementById("RouteList").innerHTML += "<tr>"
                            + "<td>" + res.data[i].routeID + "</td>"
                            + "<td>"
                            + "<button class = 'route' id =" + res.data[i].routeID + "> Chi tiết </button>"
                            + "<button class='routeDel'>Xóa</button>"
                            + "</td>"
                            + "<tr/>";
                    }
                    let obj = document.getElementsByClassName('routeDel');
                    for (let i = 0; i < obj.length; i++)
                        obj[i].addEventListener('click', handleClickNotDev);
                    obj = document.getElementsByClassName('route');
                    for (let i = 0; i < obj.length; i++)
                        obj[i].addEventListener('click', handleClickInfo);
                })
                .catch(error => console.log(error));
            effectRan.current = true;
        }

    })

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
        <div className='myRouteList'>
            <h1 >Danh sách tuyến đường</h1>
            <table>
                <thead>
                    <tr>
                        <th><h3>Mã tuyến</h3></th>
                        <th><h3>Tác vụ</h3></th>
                    </tr>
                </thead>
                <tbody id="RouteList">
                </tbody>
            </table>
            <br />
            <br />
            <view>
                <button onClick={ handleClickNotDev }>Thêm tuyến đường</button>
            </view>
        </div>
    );
}