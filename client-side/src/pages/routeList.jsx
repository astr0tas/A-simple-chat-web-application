import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import '../css/routeList.css';

export const RouteList = () =>
{
    const effectRan = useRef(false);

    const RouteRow = (props) =>
    {
        return (
            <tr>
                <td> { props.routeID } </td>
                <td>
                    <button class='route' onClick={ event => handleClickInfo(event, props.routeID) }> Chi tiết </button>
                    <button class='routeDel' onClick={ event => handleDelete(event, props.routeID) }>Xóa</button>
                </td>
            </tr>
        );
    }

    useEffect(() =>
    {
        if (effectRan.current === false)
        {
            let setColor = document.getElementsByClassName('RouteManage');
            setColor[0].style.color = "blue";

            axios.get('http://localhost:4000/routeList')
                .then(res =>
                {
                    let temp = [];
                    for (let i in res.data)
                        temp.push(<RouteRow routeID={ res.data[i].routeID } />);
                    const render = ReactDOM.createRoot(document.getElementById('RouteList'));
                    render.render(<>{ temp }</>);
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