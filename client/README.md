Before you start the client in dev mode, first you will need to create a SSL certificate:
      1. (If you have already installed mkcert then skip this step) open window powershell as administrator and type `choco install mkcert`, then type `mkcert -install` (for windows, if you use other OSes then you will need to search for the commands).
      2. Create a folder `cert` in the client root directory by typing `mkdir cert` and then go to that directory.
      3. Type `mkcert -key-file key.pem -cert-file cert.pem localhost` or `mkcert -key-file key.pem -cert-file cert.pem localhost 127.0.0.1 ::1` to create a SSL certificate.

Type `npm start` to start the react app in dev mode.
Type `npm run build` to build a production ready version of the app (and if you want to test the deployment locally then type `npx serve -s build --ssl-cert cert/cert.pem --ssl-key cert/key.pem`).