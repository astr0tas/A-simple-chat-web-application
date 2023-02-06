==>> Before you set up MySQL database for the project, please follow these steps.

Step 1: Locate config file of MySQL, which at default is C:\ProgramData\MySQL\MySQL Server 8.0\my.
	(ProgramData is not visible by default, you will need to check the 'Hidden items' box; 'my' file is not writable by default, you will need to allow the current user of your PC to have the write permission).
Step 2: Press Ctrl + F and find [mysqld].
Step 3: Past this code 'max_allowed_packet=1024M' below it, this will allow you to insert pictures that are <1024MB.
Step 4: Find 'secure-file-priv'; if it does not have a value, set it back to "C:\ProgramData\MySQL\MySQL Server 8.0\Uploads\", this will allow you to only insert images/files which are located at C:\ProgramData\MySQL\MySQL Server 8.0\Uploads.
Step 5: Save and exit the file.
Step 6: Press Window + R and search for services.msc, locate mysql (if found) and MySQL80 and restart both of them.
Step 7: You are ready to go!


==>> Next run the uwc_create manager file first -> uwc_db creation -> uwc_data seeding.

==>> Enjoy the pain!
