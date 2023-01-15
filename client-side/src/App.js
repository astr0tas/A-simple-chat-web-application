import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { Login } from './pages/login.jsx';
import { MCPInfo } from './pages/mcpInfo.jsx';
import { MCPList } from './pages/mcpList.jsx';
import { Sorry } from './pages/inDevelopment.jsx';
import { MyMenu } from './pages/sidemenu.jsx';
import { Message } from './pages/message.jsx';
import { VehicleList } from './pages/vehicleList.jsx';
import { VehicleInfo } from './pages/vehicleInfo.jsx';
import { WorkerList } from './pages/workerList.jsx';
import { WorkerInfo } from './pages/workerInfo.jsx';
import { WorkerSchedule } from './pages/workerSchedule.jsx';
import { RouteList } from './pages/routeList.jsx';
import { RouteInfo } from './pages/routeInfo.jsx';
import { AreaList } from './pages/areaList.jsx';
import { AreaInfo } from './pages/areaInfo.jsx';
import { TaskScheduleJanitor } from "./pages/taskScheduleJanitor.jsx";
import { TaskScheduleCollector } from "./pages/taskScheduleCollector.jsx";
import { TaskArea } from "./pages/taskArea.jsx";
import { TaskRoute } from "./pages/taskRoute.jsx";

function App()
{
      return (
            <div className="App">
                  <BrowserRouter>
                        <Routes>
                              <Route index element={ <Login /> } />
                              <Route element={ <MyMenu /> }>
                                    <Route path="mcpList" element={ <MCPList /> } />
                                    <Route path="mcpList/:mcpID" element={ <MCPInfo /> } />
                                    <Route path="message" element={ <Message /> } />
                                    <Route path="inDev" element={ <Sorry /> } />
                                    <Route path="vehicleList" element={ <VehicleList /> } />
                                    <Route path="vehicleList/:vehicleID" element={ <VehicleInfo /> } />
                                    <Route path="workerList" element={ <WorkerList /> } />
                                    <Route path="workerList/:workerID" element={ <WorkerInfo /> } />
                                    <Route path="workerList/:workerID/schedule" element={ <WorkerSchedule /> } />
                                    <Route path="routeList" element={ <RouteList /> } />
                                    <Route path="routeList/:routeID" element={ <RouteInfo /> } />
                                    <Route path="areaList" element={ <AreaList /> } />
                                    <Route path="areaList/:areaID" element={ <AreaInfo /> } />
                                    <Route path="workerList/janitorList/:janitorID/taskScheduleJanitor" element={ <TaskScheduleJanitor /> } />
                                    <Route path="workerList/janitorList/:janitorID/taskScheduleJanitor/taskArea" element={ <TaskArea /> } />
                                    <Route path="workerList/collectorList/:collectorID/taskScheduleCollector" element={ <TaskScheduleCollector /> } />
                                    <Route path="workerList/collectorList/:collectorID/taskScheduleCollector/taskRoute" element={ <TaskRoute /> } />
                              </Route>
                        </Routes>
                  </BrowserRouter>
            </div>
      );
}

export default App;
