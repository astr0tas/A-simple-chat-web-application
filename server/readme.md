### Before you start the server, first you will need to create a self-signed SSL certificate (only apply for local server) by following these steps:
      1. (If you have already installed mkcert then skip this step) open window powershell as administrator and type `choco install mkcert`, then type `mkcert -install` (for windows, if you use other OSes then you will need to search for the commands).
      2. Create a folder `cert` in the server root directory by typing `mkdir cert` and then go to that directory.
      3. Type `mkcert -key-file key.pem -cert-file cert.pem localhost <your ip address>` to create a SSL certificate for your localhost and IP address server.

#### Type `npm run dev` to start the server in dev mode.
#### Type `npm start` to start tthe server in production mode.