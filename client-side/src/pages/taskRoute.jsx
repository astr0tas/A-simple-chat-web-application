import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import '../css/taskRoute.css';
import vehicleList from '../data/vehicle.js';
import routeList from '../data/route.js';
import { Collector } from '../data/worker.js';
import { timeTableCollector } from '../data/timeTable.js';
import { timeTableIndex, shiftIndex } from './taskScheduleCollector.jsx';

export const TaskRoute = () =>
{

    const effectRan = useRef(false);

    useEffect(() =>
    {
        if (effectRan.current === false)
        {
            let setColor = document.getElementsByClassName('WorkerManage');
            let setColor1 = document.getElementsByClassName('VehicleManage');
            let setColor2 = document.getElementsByClassName('RouteManage');
            setColor[0].style.color = "blue";
            setColor1[0].style.color = "black";
            setColor2[0].style.color = "black";

            for (let key in vehicleList)
            {
                document.getElementById("TaskRoute").innerHTML += "<tr>"
                    + "<td>" + vehicleList[key].ma + "<button class = 'vehicle' id =" + vehicleList[key].ma + "> Chi tiết </button>" + "</td>"
                    + "<td>" + vehicleList[key].tuyenduongphutrach + "<button class = 'route' id =" + vehicleList[key].tuyenduongphutrach + "> Chi tiết </button>" + "</td>"
                    + "<td>"
                    + "<input type = 'checkbox' class = 'checkBox' id=\"choose" + vehicleList[key].tuyenduongphutrach + "\"/>"
                    + "</td>"
                    + "<tr/>";
            }
            let obj = document.getElementsByClassName('vehicle');
            for (let i = 0; i < obj.length; i++)
                obj[i].addEventListener('click', vehicleInfo);
            obj = document.getElementsByClassName('route');
            for (let i = 0; i < obj.length; i++)
                obj[i].addEventListener('click', routeInfo);
            obj = document.getElementsByClassName('checkBox');
            for (let i = 0; i < obj.length; i++)
                obj[i].addEventListener('click', () => { changeChosen(obj[i].id) });
            effectRan.current = true;
        }
    });

    var chosenRoute = "NULL";
    const changeChosen = (route) =>
    {
        let obj = document.getElementById(route);
        if (obj.checked === true)
            chosenRoute = route.substring(6);
        else
            chosenRoute = "NULL";
    }

    const Navigate = useNavigate();

    const finish = (event) =>
    {
        event.preventDefault();
        let isOK = true;
        for (let key1 in routeList)
        {
            if (routeList[key1].ma === chosenRoute)
            {
                for (let key2 in routeList[key1].congnhan)
                {
                    for (let key3 in Collector)
                    {
                        if (Collector[key3].ID === routeList[key1].congnhan[key2])
                        {
                            for (let key4 in Collector[key3].lichlamviec)
                            {
                                if (Collector[key3].lichlamviec[key4].Ngay === timeTableCollector[timeTableIndex].date && Collector[key3].lichlamviec[key4].Thoigian === timeTableCollector[timeTableIndex].shifts[shiftIndex].period)
                                {
                                    isOK = false;
                                    break;
                                }
                            }
                            break;
                        }
                    }
                    if (!isOK) break;
                }
                break;
            }
        }
        if (isOK)
        {
            window.alert("Phân công nhiệm vụ thành công!");
            Navigate(-2);
        }
        else
            window.alert("Tuyến đường này đã được phân công cho công nhân khác!");
    }

    const vehicleInfo = (event) =>
    {
        event.preventDefault();
        Navigate("../vehicleList/" + event.currentTarget.id);
    }

    const routeInfo = (event) =>
    {
        event.preventDefault();
        Navigate("../routeList/" + event.currentTarget.id);
    }

    const goBack = (event) =>
    {
        event.preventDefault();
        Navigate(-1);
    }

    return (
        <div className='mytaskRoute'>
            <h1 >Danh sách tuyến đường</h1>
            <table>
                <thead>
                    <tr>
                        <th><h3>Xe</h3></th>
                        <th><h3>Mã tuyến đường</h3></th>
                        <th><h3>Tác vụ</h3></th>
                    </tr>
                </thead>
                <tbody id="TaskRoute">
                </tbody>
            </table>
            <br />
            <br />
            <view>
                <button onClick={ goBack }>Quay lại</button>
                <button onClick={ finish }>Xác nhận</button>
            </view>
        </div>
    );
}