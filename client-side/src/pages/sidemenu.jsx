import { useNavigate, Outlet } from 'react-router-dom';
import '../css/sidemenu.css'

export const MyMenu = () =>
{
    const Navigate = useNavigate();

    const handleClickLogout = (event) =>
    {
        event.preventDefault();
        Navigate("/");
    }

    return (
        <div>
            <div className='menu'>
                <h1>Quản trị</h1>
                <a href='/sideMenu/workerList/janitorList' class="WorkerManage">Quản lý nhân viên</a>
                <a href='/sideMenu/vehicleList' class="VehicleManage">Quản lý xe</a>
                <a href='/sideMenu/routeList' class="RouteManage">Quản lý tuyến đường</a>
                <a href='/sideMenu/areaList' class="AreaManage">Quản lý khu vực</a>
                <a href='/sideMenu/mcpList' class="MCPManage">Quản lý MCP</a>
                <a href='/sideMenu/message' class="Message">Tin nhắn</a>
                <button onClick={ handleClickLogout }>Đăng xuất</button>
            </div>
            <Outlet />
        </div>
    )
}