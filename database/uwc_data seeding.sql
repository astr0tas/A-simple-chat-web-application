use uwc;
-- set @path=@@secure_file_priv;
set @path="E:/Projects/UWC-2.0-Enhanced-Edition/database/pictures/";
-- select cast(@path as char);

insert into accounts values("khoa","khoa123"),("nghia","nghia123"),("quang","quang123");

insert into employee values("023856000265","Nguyễn Anh T","J01","anht53@gmail.com","1990-03-05","Nam","0365977562","TP.HCM",load_file( concat(@path,"employee.png"))),
("036597000269","Trần H","J02","h12@gmail.com","1989-06-12","Nam","0322585123","TP.HCM",load_file( concat(@path,"employee.png"))),
("065125000247","Lê Anh K","J03","anhk28@gmail.com","1994-10-28","Nam","0254666732","TP.HCM",load_file( concat(@path,"employee.png"))),
("023857000982","Lê Trung K","J04","trungk@gmail.com","1993-07-27","Nam","0897222876","TP.HCM",load_file( concat(@path,"employee.png"))),
("053432000232","Nguyễn Xuân A","J05","anguyen@gmail.com","1989-01-18","Nam","0784002777","TP.HCM",load_file( concat(@path,"employee.png"))),
("078456000821","Trần B","J06","btran@gmail.com","1996-09-19","Nam","0789232177","TP.HCM",load_file( concat(@path,"employee.png"))),
("098255000347","Dương Anh L","J07","anhl93@gmail.com","1993-11-25","Nam","0122892732","TP.HCM",load_file( concat(@path,"employee.png"))),
("098299000271","Đinh Xuân P","J08","xuanp@gmail.com","1991-05-12","Nam","0902804277","TP.HCM",load_file( concat(@path,"employee.png"))),
("090288000281","Nguyễn N","J09","nguyenn22@gmail.com","1996-06-22","Nam","0908137822","TP.HCM",load_file( concat(@path,"employee.png"))),
("097369000189","Võ Gia K","J10","kvo17@gmail.com","1989-07-17","Nam","0909767255","TP.HCM",load_file( concat(@path,"employee.png"))),
("058365000269","Nguyễn Anh D","C01","anhd15@gmail.com","1992-03-15","Nam","0957652236","TP.HCM",load_file( concat(@path,"employee.png"))),
("067123000972","Trần Văn H","C02","htran@gmail.com","1987-05-19","Nam","0962819002","TP.HCM",load_file( concat(@path,"employee.png"))),
("097829000128","Đỗ Đức T","C03","tdo09@gmail.com","1996-12-09","Nam","0907182666","TP.HCM",load_file( concat(@path,"employee.png"))),
("078129000777","Nguyễn Cao C","C04","caoc@gmail.com","1994-11-15","Nam","0906123765","TP.HCM",load_file( concat(@path,"employee.png"))),
("019272000891","Đỗ Trọng A","C05","trongado@gmail.com","1993-07-22","Nam","0909436771","TP.HCM",load_file( concat(@path,"employee.png"))),
("012298000281","Trần Trọng N","C06","ntran@gmail.com","1997-08-09","Nam","0978127775","TP.HCM",load_file( concat(@path,"employee.png"))),
("098193000212","Bùi Minh T","C07","minht@gmail.com","1995-10-25","Nam","0778291212","TP.HCM",load_file( concat(@path,"employee.png"))),
("078129000271","Vũ Trần H","C08","hvu19@gmail.com","1996-02-19","Nam","0782029120","TP.HCM",load_file( concat(@path,"employee.png"))),
("079891000281","Nguyễn Minh Q","C09","minhq@gmail.com","1996-08-08","Nam","0901876555","TP.HCM",load_file( concat(@path,"employee.png"))),
("081922000891","Nguyễn Lâm N","C10","nnguyen13@gmail.com","1994-03-13","Nam","0989137225","TP.HCM",load_file( concat(@path,"employee.png")));

insert into route values("R01"),
("R02"),
("R03"),
("R04"),
("R05"),
("R06"),
("R07"),
("R08"),
("R09"),
("R10");

insert into area values("A01"),
("A02"),
("A03"),
("A04"),
("A05"),
("A06"),
("A07"),
("A08"),
("A09"),
("A10");

insert into vehicle values("3AA-1015","V01","Sẵn sàng sử dụng", "Heil",35,"R10",load_file( concat(@path,"vehicle.png"))),
("3AA-2155","V02","Sẵn sàng sử dụng", "Heil",35,"R09",load_file( concat(@path,"vehicle.png"))),
("3AA-7856","V03","Sẵn sàng sử dụng", "Aerosun",40,"R08",load_file( concat(@path,"vehicle.png"))),
("3AA-1305","V04","Sẵn sàng sử dụng", "Aerosun",40,"R07",load_file( concat(@path,"vehicle.png"))),
("3AA-8465","V05","Sẵn sàng sử dụng", "Aerosun",30,"R06",load_file( concat(@path,"vehicle.png"))),
("3AA-4564","V06","Sẵn sàng sử dụng", "Heil",45,"R05",load_file( concat(@path,"vehicle.png"))),
("3AA-0000","V07","Sẵn sàng sử dụng", "Heil",40,"R04",load_file( concat(@path,"vehicle.png"))),
("3AA-5555","V08","Sẵn sàng sử dụng", "Heil",35,"R03",load_file( concat(@path,"vehicle.png"))),
("3AA-8977","V09","Sẵn sàng sử dụng", "Heil",35,"R02",load_file( concat(@path,"vehicle.png"))),
("3AA-1235","V10","Sẵn sàng sử dụng", "Heil",30,"R01",load_file( concat(@path,"vehicle.png")));

set @path:="E:/Projects/UWC-2.0-Enhanced-Edition/database/pictures/MCPs/";

insert into mcp values("MCP01","Hùng Vương, Quận 10, TP.HCM",30,15,null,load_file( concat(@path,"mcp01.png")),"R01","A10"),
("MCP02","Lê Hồng Phong, Quận 10, TP.HCM",20,17,null,load_file(concat(@path,"mcp02.png")),"R02","A09"),
("MCP03","Lý Thái Tổ, Quận 10, TP.HCM",40,9,null,load_file(concat(@path,"mcp03.png")),"R03","A08"),
("MCP04","Nguyễn Chí Thanh, Quận 10, TP.HCM",18,13,null,load_file(concat(@path,"mcp04.png")),"R04","A07"),
("MCP05","Sư Vạn Hạnh, Quận 10, TP.HCM",24,19,null,load_file(concat(@path,"mcp05.png")),"R05","A06"),
("MCP06","Trần Nhân Tôn, Quận 10, TP.HCM",20,20,null,load_file(concat(@path,"mcp06.png")),"R06","A05"),
("MCP07","Ngô Gia Tự, Quận 10, TP.HCM",15,0,null,load_file(concat(@path,"mcp07.png")),"R07","A04"),
("MCP08","Nguyễn Tri Phương, Quận 10, TP.HCM",30,27,null,load_file(concat(@path,"mcp08.png")),"R08","A03"),
("MCP09","Ngô Quyền, Quận 10, TP.HCM",17,15,null,load_file(concat(@path,"mcp09.png")),"R09","A02"),
("MCP10","3 Tháng 2, Quận 10, TP.HCM",15,10,null,load_file(concat(@path,"mcp10.png")),"R10","A01");

-- select*from employee;