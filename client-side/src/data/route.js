/**
 * ma: string
 * mcps: vector
 * streets: vector
 * vehile: string
 * worker: int
 */
//export const mcplist = ["MCP01", "MCP02", "MCP03", "MCP04", "MCP05", "MCP06", "MCP07", "MCP08", "MCP09", "MCP10"]

export const baseMCPPath = "/sideMenu/mcpList/"
export const baseVehiclePath = "/sideMenu/vehicleList/"
export const baseWorkerPath = "/sideMenu/workerList/"

var routeList = [
    {
        ma: "R01",
        cacmcp: ["MCP01", "MCP10"],
        tenduong: 'Hùng Vương, 3 Tháng 2',
        xe: 'V10',
        congnhan: ['C01']
    },
    {
        ma: "R02",
        cacmcp: ["MCP02", "MCP09"],
        tenduong: 'Lê Hồng Phong, Ngô Quyền',
        xe: 'V09',
        congnhan: []
    },
    {
        ma: "R03",
        cacmcp: ["MCP03", "MCP08"],
        tenduong: 'Lý Thái Tổ, Nguyễn Tri Phương',
        xe: 'V08',
        congnhan: []
    },
    {
        ma: "R04",
        cacmcp: ["MCP04", "MCP07"],
        tenduong: 'Nguyễn Chí Thanh, Ngô Gia Tự',
        xe: 'V07',
        congnhan: []
    },
    {
        ma: "R05",
        cacmcp: ["MCP05", "MCP06"],
        tenduong: 'Sư Vạn Hạnh, Trần Nhân Tôn',
        xe: 'V06',
        congnhan: []
    },
    {
        ma: "R06",
        cacmcp: ["MCP01", "MCP05"],
        tenduong: 'Hùng Vương, Sư Vạn Hạnh',
        xe: 'V05',
        congnhan: []
    },
    {
        ma: "R07",
        cacmcp: ["MCP07", "MCP08"],
        tenduong: 'Ngô Gia Tự, Nguyễn Tri Phương',
        xe: 'V04',
        congnhan: []
    },
    {
        ma: "R08",
        cacmcp: ["MCP04", "MCP10"],
        tenduong: 'Nguyễn Chí Thanh, 3 Tháng 2',
        xe: 'V03',
        congnhan: []
    },
    {
        ma: "R09",
        cacmcp: ["MCP02", "MCP06"],
        tenduong: 'Lê Hồng Phong, Trần Nhân Tôn',
        xe: 'V02',
        congnhan: []
    },
    {
        ma: "R10",
        cacmcp: ["MCP03", "MCP09"],
        tenduong: 'Lý Thái Tổ, Ngô Quyền',
        xe: 'V01',
        congnhan: []
    },
];

export default routeList;
