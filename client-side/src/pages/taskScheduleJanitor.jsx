import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import '../css/taskScheduleJanitor.css';
import { timeTableJanitor } from '../data/timeTable.js';
import { Janitor } from '../data/worker.js';


var timeTableIndex = -1, shiftIndex = -1;

export { timeTableIndex, shiftIndex };

export const TaskScheduleJanitor = () =>
{

    const effectRan = useRef(false);

    useEffect(() =>
    {
        if (effectRan.current === false)
        {
            let setColor = document.getElementsByClassName('WorkerManage');
            setColor[0].style.color = "blue";
            effectRan.current = true;
        }

    });

    const getShifts = (event, index) =>
    {
        event.preventDefault();
        document.getElementById('TaskScheduleJanitor').innerHTML = "";
        let key;
        for (key in timeTableJanitor[index].shifts)
        {
            document.getElementById('TaskScheduleJanitor').innerHTML += "<tr>"
                + "<td>" + timeTableJanitor[index].date + " ca " + timeTableJanitor[index].shifts[key].period + "</td>"
                + "<td>" + timeTableJanitor[index].shifts[key].count + "</td>"
                + "<td>" + "<input type = 'checkbox' class = 'checkBox' id=\"" + key + "\"/> </td>"
                + "</tr>";
        }

        let obj = document.getElementsByClassName('checkBox');
        for (let i = 0; i < obj.length; i++)
            obj[i].addEventListener('click', () => { changeIndex(index, Number(obj[i].id)) });
    }

    const changeIndex = (updateTimeTableIndex, updateShiftIndex) =>
    {
        let obj = document.getElementById(String(updateShiftIndex));
        if (obj.checked === true)
        {
            timeTableIndex = updateTimeTableIndex;
            shiftIndex = updateShiftIndex;
        }
        else
        {
            timeTableIndex = -1;
            shiftIndex = -1;
        }
    }

    const Navigate = useNavigate();

    const currentURL = useParams();
    const janitorID = currentURL.janitorID;
    const chooseArea = (event) =>
    {
        event.preventDefault();
        if (timeTableIndex === -1 || shiftIndex === -1)
            window.alert("Bạn chưa chọn ca làm!");
        else
        {
            let isOK = true;
            for (let key1 in Janitor)
            {
                if (Janitor[key1].ID === janitorID)
                {
                    for (let key2 in Janitor[key1].lichlamviec)
                    {
                        if (Janitor[key1].lichlamviec[key2].Ngay === timeTableJanitor[timeTableIndex].date && Janitor[key1].lichlamviec[key2].Thoigian === timeTableJanitor[timeTableIndex].shifts[shiftIndex].period)
                        {
                            isOK = false;
                            break;
                        }
                    }
                    break;
                }
            }
            if (isOK)
                Navigate("./taskArea");
            else
                window.alert("Nhân viên đã được phân công ca làm này!");
        }
    }

    const goBack = (event) =>
    {
        event.preventDefault();
        Navigate(-1);
    }

    return (
        <div className='mytaskScheduleJanitor'>
            <h1 >Bảng ca làm</h1>
            <h3>Chọn ngày</h3>
            <view>
                <button onClick={ (event) => { getShifts(event, 0) } }>{ timeTableJanitor[0].date }</button>
                <button onClick={ (event) => { getShifts(event, 1) } }>{ timeTableJanitor[1].date }</button>
                <button onClick={ (event) => { getShifts(event, 2) } }>{ timeTableJanitor[2].date }</button>
                <button onClick={ (event) => { getShifts(event, 3) } }>{ timeTableJanitor[3].date }</button>
                <button onClick={ (event) => { getShifts(event, 4) } }>{ timeTableJanitor[4].date }</button>
                <button onClick={ (event) => { getShifts(event, 5) } }>{ timeTableJanitor[5].date }</button>
                <button onClick={ (event) => { getShifts(event, 6) } }>{ timeTableJanitor[6].date }</button>
            </view>
            <table>
                <thead>
                    <tr>
                        <th><h3>Thời gian</h3></th>
                        <th><h3>Số nhân viên trong ca</h3></th>
                        <th><h3>Tác vụ</h3></th>
                    </tr>
                </thead>
                <tbody id="TaskScheduleJanitor">
                </tbody>
            </table>
            <br />
            <br />
            <view>
                <button onClick={ goBack }>Quay lại</button>
                <button onClick={ chooseArea }>Tiếp tục</button>
            </view>
        </div>
    );
}