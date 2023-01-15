import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/routeList.css';
import routeList from '../data/route.js';

export const RouteList = () => {
    const effectRan = useRef(false);

    useEffect(() =>
    {
        if (effectRan.current === false)
        {
            let setColor = document.getElementsByClassName('RouteManage');
            setColor[0].style.color = "blue";
        
            for (let key in routeList){
                document.getElementById("RouteList").innerHTML += "<tr>"
                    + "<td>" + routeList[key].ma + "</td>"
                    + "<td>"
                    + "<button class = 'route' id =" + routeList[key].ma + "> Chi tiết </button>"
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