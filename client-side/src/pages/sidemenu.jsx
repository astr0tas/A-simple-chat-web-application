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
                <h1>Tác vụ</h1>
                <a href='/workerList' class="WorkerManage">Quản lý nhân viên</a>
                <a href='/vehicleList' class="VehicleManage">Quản lý xe</a>
                <a href='/routeList' class="RouteManage">Quản lý tuyến đường</a>
                <a href='/areaList' class="AreaManage">Quản lý khu vực</a>
                <a href='/mcpList' class="MCPManage">Quản lý MCP</a>
                <a href='/message' class="Message">Tin nhắn</a>
                <button onClick={ handleClickLogout }>Đăng xuất</button>
            </div>
            <Outlet />
        </div>
    )
}