import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import '../css/areaList.css';

export const AreaList = () =>
{
    const effectRan = useRef(false);

    const AreaRow = (props) =>
    {
        return (
            <tr>
                <td>  { props.areaID } </td>
                <td>
                    <button class='areas' onClick={ event => handleClickInfo(event, props.areaID) }> Chi tiết </button>
                    <button class='areaDel' onClick={ event => handleDelete(event, props.areaID) }>Xóa</button>
                </td>
            </tr >
        );
    }

    useEffect(() =>
    {
        if (effectRan.current === false)
        {
            let setColor = document.getElementsByClassName('AreaManage');
            setColor[0].style.color = "blue";

            axios.get('http://localhost:4000/areaList')
                .then(res =>
                {
                    let temp = [];
                    for (let i in res.data)
                        temp.push(<AreaRow areaID={ res.data[i].areaID } />);
                    const render = ReactDOM.createRoot(document.getElementById('AreaList'));
                    render.render(<>{ temp }</>);
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