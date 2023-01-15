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
import { CollectorList } from './pages/collectorList.jsx';
import { JanitorList } from './pages/janitorList.jsx';
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
                              <Route path="sideMenu" element={ <MyMenu /> }>
                                    <Route path="mcpList" element={ <MCPList /> } />
                                    <Route path="mcpList/:MCPxx" element={ <MCPInfo /> } />
                                    <Route path="message" element={ <Message /> } />
                                    <Route path="inDev" element={ <Sorry /> } />
                                    <Route path="vehicleList" element={ <VehicleList /> } />
                                    <Route path="vehicleList/:vehiclexx" element={ <VehicleInfo /> } />
                                    <Route path="workerList/collectorList" element={ <CollectorList /> } />
                                    <Route path="workerList/janitorList" element={ <JanitorList /> } />
                                    <Route path="workerList/:workerID" element={ <WorkerInfo /> } />
                                    <Route path="workerList/:workerID/schedule" element={ <WorkerSchedule /> } />
                                    <Route path="routeList" element={ <RouteList /> } />
                                    <Route path="routeList/:Rxx" element={ <RouteInfo /> } />
                                    <Route path="areaList" element={ <AreaList /> } />
                                    <Route path="areaList/:Axx" element={ <AreaInfo /> } />
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
