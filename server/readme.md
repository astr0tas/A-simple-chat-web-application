Before you start the server, first you will need to create a SSL certificate:
      1. Create a `cert` folder with `mkdir cert` and go to that directory with `cd cert`
      2. Type `openssl genrsa -out key.pem` to generate private RSA key store in `key.pem`.
      3. Type `openssl req -new -key key.pem -out csr.pem` to create a certificate signing request (this will be used to request a SSL certificate either from trusted or local certificate authorities) store in `csr.pem` (you will have to enter a few information inquiries but they can be left blank, your server password can be stored in this server by creating a `password.txt` file in the root directory, this file won't be committed to the git repository).
      4. Type `openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem` to generate a SSL certificate stored in `key.pem` using local certificate authority, and will be valid for 1 year.
