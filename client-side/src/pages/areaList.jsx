import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/areaList.css';

export const AreaList = () =>
{
    const effectRan = useRef(false);

    useEffect(() =>
    {
        if (effectRan.current === false)
        {
            let setColor = document.getElementsByClassName('AreaManage');
            setColor[0].style.color = "blue";

            axios.get('http://localhost:4000/areaList')
                .then(res =>
                {
                    console.log(res.data);
                    for (let i in res.data)
                    {
                        document.getElementById("AreaList").innerHTML += "<tr>"
                            + "<td>" + res.data[i].areaID + "</td>"
                            + "<td>"
                            + "<button class = 'areas'" + res.data[i].areaID + "> Chi tiết </button>"
                            + "<button class='areaDel'>Xóa</button>"
                            + "</td>"
                            + "<tr/>";
                    }
                    let obj = document.getElementsByClassName('areaDel');
                    for (let i = 0; i < res.data.length; i++)
                        obj[i].addEventListener('click', event => handleDelete(event, res.data[i].areaID));
                    obj = document.getElementsByClassName('areas');
                    for (let i = 0; i < res.data.length; i++)
                        obj[i].addEventListener('click', event => handleClickInfo(event, res.data[i].areaID));
                })
                .catch(error => console.log(error));

            effectRan.current = true;
        }

    });

    const Navigate = useNavigate();

    const handleClickNotDev = (event) =>
    {
        event.preventDefault();
        Navigate("/inDev");
    }

    const handleDelete = (event, areaID) =>
    {
        event.preventDefault();
        axios.delete('http://localhost:4000/areaList/delete', { params: { ID: areaID } }).
            then(res =>
            {
                window.alert(res.data.message);
                window.location.reload();
            })
            .catch(error => console.log(error));
    }

    const handleClickInfo = (event, areaID) =>
    {
        event.preventDefault();
        Navigate("./" + areaID);
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