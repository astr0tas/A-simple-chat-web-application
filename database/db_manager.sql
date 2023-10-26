DROP USER IF EXISTS 'uwc'@'localhost';
create user 'uwc'@'localhost' identified with mysql_native_password by 'uwc123';
-- Or use this line if the above one does not work
-- create user 'uwc'@'localhost' identified by 'uwc123';

grant all privileges on UWC_ENHANCED_EDITION.* to 'uwc'@'localhost';