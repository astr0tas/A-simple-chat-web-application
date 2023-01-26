==>> Before you set up MySQL database for the project, please follow these steps.

Step 1: Locate config file of MySQL, which at default is C:\ProgramData\MySQL\MySQL Server 8.0\my.
Step 2: Press Ctrl + F and find [mysqld].
Step 3: Past this code 'max_allowed_packet=1024M' below it, this will allow you to insert pictures that are <1024MB.
Step 4: Save and exit the file.
Step 5: Press Window + R and search for services.msc, locate mysql and MySQL80 and restart both of them.
Step 6: Put all the MCP picture files in the correct folder (you can not run the 'load_file()' command if you don't do this).
	To find the path of the folder, you can run the command 'select @@secure_file_priv;' to find the path.
	The default path is C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/
	If you want to create child folders in Uploads to store the pictures, you will have to change the paths in the uwc_data seeding file for example: from 'mcp01.jpg' to 'your_folder/../mcp01.jpg'.
Step 7: You are ready to go!


==>> Next run the uwc_create manager file first -> uwc_db creation -> uwc_data seeding.

==>> Enjoy the pain!
