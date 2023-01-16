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
                            + "<button class = 'route'" + res.data[i].routeID + "> Chi tiết </button>"
                            + "<button class='routeDel'>Xóa</button>"
                            + "</td>"
                            + "<tr/>";
                    }
                    let obj = document.getElementsByClassName('routeDel');
                    for (let i = 0; i < res.data.length; i++)
                        obj[i].addEventListener('click', event => handleDelete(event, res.data[i].routeID));
                    obj = document.getElementsByClassName('route');
                    for (let i = 0; i < res.data.length; i++)
                        obj[i].addEventListener('click', event => handleClickInfo(event, res.data[i].routeID));
                })
                .catch(error => console.log(error));
            effectRan.current = true;
        }

    })

    const Navigate = useNavigate();

    const handleClickNotDev = (event) =>
    {
        event.preventDefault();
        Navigate("/inDev");
    }

    const handleDelete = (event, routeID) =>
    {
        event.preventDefault();
        axios.delete('http://localhost:4000/routeList/delete', { params: { ID: routeID } })
            .then(res =>
            {
                window.alert(res.data.message);
                window.location.reload();
            })
            .catch(error => console.log(error));
    }

    const handleClickInfo = (event, routeID) =>
    {
        event.preventDefault();
        Navigate("./" + routeID);
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