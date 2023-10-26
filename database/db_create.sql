DROP SCHEMA IF EXISTS UWC_ENHANCED_EDITION;
CREATE SCHEMA UWC_ENHANCED_EDITION;
USE UWC_ENHANCED_EDITION;

create table account(
	username char(20) primary key,
	password char(50) not null
);

create table employee(
	ID char(10) primary key,
    name char(100) not null,
    SSN char(12) not null unique,
    email char(50) not null unique,
    dob date not null,
    pob text not null,
    gender char(1) not null check (gender='F' or gender='M'),
    phone char(10) not null,
    address text not null,
    image text not null
);

create table collector(
	ID char(10) primary key references employee(ID) on delete cascade on update cascade
);

create table janitor(
	ID char(10) primary key references employee(ID) on delete cascade on update cascade
);

create table vehicle(
	ID char(10) primary key,
    plate char(11) not null unique,
    status int not null default 1 check(status=1 or status=2 or status=3),
    image text not null,
    maximumCap int not null check (maximumCap>0)
);

-- create table vehicleLog(
-- 	vehicleID char(10) references vehicle(ID) on delete cascade on update cascade,
--     date date,
--     time time,
--     currentPosition text not null,
--     primary key(vehicleID,date,time)
-- );

create table area(
	ID char(10) primary key
);

create table route(
	ID char(10) primary key
); 

create table mcp(
	ID char(10) primary key,
    image text not null,
    address text not null,
    maximumCap int not null check(maximumCap>0),
    areaID char(10) not null references area(ID) on delete cascade on update cascade,
    routeID char(10) not null references router(ID) on delete cascade on update cascade
);

-- create table mcpLog(
-- 	mcpID char(10) references MCP(ID) on delete cascade on update cascade,
--     date date,
--     time time,
--     currentCap int not null check (currentCap>=0)
-- );

create table shift(
	number int primary key,
	startHour time not null,
	endHour time not null
);

create table EAL(
	ID char(10) primary key
);

create table CAL(
	ID char(10) primary key references EAL(ID) on delete cascade on update cascade,
    collectorID char(10) not null references collector(ID) on delete cascade on update cascade,
    vehicleID char(10) not null references vehicle(ID) on delete cascade on update cascade,
    routeID char(10) not null references route(ID) on delete cascade on update cascade,
    shift int not null references shift(number) on delete cascade on update cascade,
    date date not null
);

create table JAL(
	ID char(10) primary key references EAL(ID) on delete cascade on update cascade,
    areaID char(10) not null references area(ID) on delete cascade on update cascade,
    shift int not null  references shift(number) on delete cascade on update cascade,
    date date not null
);

create table JALjanitor(
	jalID char(10) references JAL(ID) on delete cascade on update cascade,
    janitorID char(10) references janitor(ID) on delete cascade on update cascade,
    primary key(jalID,janitorID)
);