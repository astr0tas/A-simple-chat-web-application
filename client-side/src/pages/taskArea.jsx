import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import '../css/taskArea.css';
import areaList from '../data/area.js';
import { timeTableIndex, shiftIndex } from './taskScheduleJanitor.jsx';
import { Janitor } from '../data/worker.js';
import { timeTableJanitor } from '../data/timeTable.js';

export const TaskArea = () =>
{

    const effectRan = useRef(false);

    useEffect(() =>
    {
        if (effectRan.current === false)
        {
            let setColor = document.getElementsByClassName('WorkerManage');
            let setColor1 = document.getElementsByClassName('AreaManage');
            setColor[0].style.color = "blue";
            setColor1[0].style.color = "black";

            for (let key in areaList)
            {
                document.getElementById("TaskArea").innerHTML += "<tr>"
                    + "<td>" + areaList[key].ma + "<button class = 'areas' id =" + areaList[key].ma + "> Chi tiết </button>" + "</td>"
                    + "<td>"
                    + "<input type = 'checkbox' class = 'checkBox' id=\"choose" + areaList[key].ma + "\"/>"
                    + "</td>"
                    + "<tr/>";
            }
            let obj = document.getElementsByClassName('areas');
            for (let i = 0; i < obj.length; i++)
                obj[i].addEventListener('click', handleClickInfo);
            obj = document.getElementsByClassName('checkBox');
            for (let i = 0; i < obj.length; i++)
                obj[i].addEventListener('click', () => { changeChosen(obj[i].id) });
            effectRan.current = true;
        }

    });

    var chosenArea = "NULL";
    const changeChosen = (route) =>
    {
        let obj = document.getElementById(route);
        if (obj.checked === true)
            chosenArea = route.substring(6);
        else
            chosenArea = "NULL";
    }

    const Navigate = useNavigate();

    const finish = (event) =>
    {
        event.preventDefault();
        let isOK = true;
        for (let key1 in areaList)
        {
            if (areaList[key1].ma === chosenArea)
            {
                for (let key2 in areaList[key1].congnhan)
                {
                    for (let key3 in Janitor)
                    {
                        if (Janitor[key3].ID === areaList[key1].congnhan[key2])
                        {
                            for (let key4 in Janitor[key3].lichlamviec)
                            {
                                if (Janitor[key3].lichlamviec[key4].Ngay === timeTableJanitor[timeTableIndex].date && Janitor[key3].lichlamviec[key4].Thoigian === timeTableJanitor[timeTableIndex].shifts[shiftIndex].period)
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
            window.alert("Khu vực này đã được phân công cho công nhân khác!");
    }

    const handleClickInfo = (event) =>
    {
        event.preventDefault();
        Navigate("../areaList/" + event.currentTarget.id);
    }

    const goBack = (event) =>
    {
        event.preventDefault();
        Navigate(-1);
    }

    return (
        <div className='mytaskArea'>
            <h1 >Danh sách khu vực thu gom</h1>
            <table>
                <thead>
                    <tr>
                        <th><h3>Mã khu vực</h3></th>
                        <th><h3>Tác vụ</h3></th>
                    </tr>
                </thead>
                <tbody id="TaskArea">
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