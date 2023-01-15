import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/areaList.css';
import areaList from '../data/area.js';

export const AreaList = () => {
    const effectRan = useRef(false);

    useEffect(() =>
    {
        if (effectRan.current === false)
        {
            let setColor = document.getElementsByClassName('AreaManage');
            setColor[0].style.color = "blue";
        
            for (let key in areaList){
                document.getElementById("AreaList").innerHTML += "<tr>"
                    + "<td>" + areaList[key].ma + "</td>"
                    + "<td>"
                    + "<button class = 'areas' id =" + areaList[key].ma + "> Chi tiết </button>"
                    + "<button class='areaDel'>Xóa</button>"
                    + "</td>"
                    + "<tr/>";
            }
            let obj = document.getElementsByClassName('areaDel');
            for (let i = 0; i < obj.length; i++)
                obj[i].addEventListener('click', handleClickNotDev);

            obj = document.getElementsByClassName('areas');
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
        <div className='myAreaList'>
            <h1 >Danh sách khu vực</h1>
                <table>
                    <thead>
                        <tr>
                            <th><h3>Mã khu vực</h3></th>
                            <th><h3>Tác vụ</h3></th>
                        </tr>
                    </thead>
                    <tbody id="AreaList">
                    </tbody>
                </table>
                <br />
                <br />
                <view>
                    <button onClick={ handleClickNotDev }>Thêm khu vực</button>
                </view>
        </div>
    );
}