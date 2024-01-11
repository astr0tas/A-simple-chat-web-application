use mysql;

-- select * from user;

drop user if exists 'web_chat'@'localhost';
create user 'web_chat'@'localhost' identified with caching_sha2_password by 'webchat123';
-- Or use this line if the above one does not work
-- create user 'web_chat'@'localhost' identified by 'webchat123';

grant all privileges on web_chat.* to 'web_chat'@'localhost';

grant file on *.* to 'web_chat'@'localhost';