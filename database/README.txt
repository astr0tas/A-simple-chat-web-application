==>> Before you set up MySQL database for the project, please follow these steps.

Step 1: Locate config file of MySQL, which at default is C:\ProgramData\MySQL\MySQL Server 8.0\my.
	(ProgramData is not visible by default, you will need to check the 'Hidden items' box; 'my' file is not writable by default, you will need to allow the current user of your PC to have the write permission).
Step 2: Press Ctrl + F and find [mysqld].
Step 3: Past this code 'max_allowed_packet=1024M' below it, this will allow you to insert pictures that are <1024MB.
Step 4: Find 'secure-file-priv'; if it has a value, set it to "", this will allow you to insert images/files freely from anywhere.
Step 5: Save and exit the file.
Step 6: Press Window + R and search for services.msc, locate MySQL80 and restart it.
Step 7: Open the 'uwc_data seeding.sql' file and locate the 'set @path' commands, 
	then change its value from "E:/Projects/UWC-2.0-Enhanced-Edition/database/pictures/" and "E:/Projects/UWC-2.0-Enhanced-Edition/database/pictures/MCPs" 
	to "<your path to the project>/UWC-2.0-Enhanced-Edition/database/pictures/" and "<your path to the project>/UWC-2.0-Enhanced-Edition/database/pictures/MCPs".
Step 8: You are ready to go!


==>> Next run the uwc_create manager file first -> uwc_db creation -> uwc_data seeding.

==>> Enjoy the pain!
