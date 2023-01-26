create schema uwc;
-- drop schema uwc;
use uwc;

alter schema uwc character set utf8mb4 collate utf8mb4_unicode_ci;
-- alter table tablename convert to character set utf8mb4 collate utf8mb4_unicode_ci; (for changing language in specific tables)

create table accounts(
	userID char(20) primary key,
    password char(20) not null
);

create table employee(
    ssn char(12) primary key,
    name char(30) not null,
    employeeID char(10) unique not null check(left(employeeID,1)='J' or left(employeeID,1)='C'),
	email char(20),
    dob date default null,
    gender char(3) check (gender='Nam' or gender='Nữ'),
    phoneNum char(10) not null,
    address char(100),
    picture longblob
);

create table workCalendar(
	employeeID char(10) references janitor(employeeID) on delete cascade,
    areaID char(10) references area(areaID) on delete cascade,
    routeID char(10) references route(routeID) on delete cascade,
    shift int not null check(shift=1 or shift=2 or shift=3),
    workDay date,
    description char(100),
    status char(50),
    primary key(employeeID,workDay),
    check((areaID is not null and routeID is null) or (areaID is null and routeID is not null))
);


create table route(
	routeID char(10) primary key
);

create table vehicle(
	plate char(10) primary key,
    vehicleID char(10) unique not null,
    status char(20) not null,
    brand char(10),
    maxWeight int not null,
	routeID char(10) references route(routeID) on delete cascade,
    picture longblob
);

create table area(
	areaID char(10) primary key
);

create table mcp(
	mcpID char(10) primary key,
    address char(100) not null,
    maximumCap int not null,
    currentCap int,
    latestCollectedDay date,
    picture longblob,
    routeID char(10) not null references route(routeID) on delete cascade,
    areaID char(10) not null references area(areaID) on delete cascade
);

delimiter $$
create procedure deleteWorkCalendar()
begin
	delete from workCalendar where datediff(current_date(),workDay)>7;
end $$
delimiter ;

use uwc;
SET SQL_SAFE_UPDATES = 0;
call deleteWorkCalendar();
SET SQL_SAFE_UPDATES = 1;