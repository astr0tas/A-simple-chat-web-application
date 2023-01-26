create user 'uwc'@'localhost' identified with mysql_native_password by 'uwc123';

grant all privileges on uwc.* to 'uwc'@'localhost';

grant file on *.* to 'uwc'@'localhost';