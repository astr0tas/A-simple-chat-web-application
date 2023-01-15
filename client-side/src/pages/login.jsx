import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

export const Login = () =>
{
    const [inputs, setInputs] = useState({});

    const Navigate = useNavigate();

    const formChange = (event) =>
    {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }


    const formSubmit = (event) =>
    {
        event.preventDefault();
        axios.get('http://localhost:4000/login')
            .then(res =>
            {
                let authSuccess = false;
                for (const i in res.data)
                {
                    if (res.data[i].userID === inputs.username && res.data[i].password === inputs.password)
                    {
                        Navigate("/workerList/janitorList");
                        authSuccess = true;
                        break;
                    }
                }
                if (!authSuccess)
                {
                    window.alert("Tài khoản đăng nhập hoặc mật khẩu sai");
                    document.getElementsByClassName("loginForm")[0].reset();
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <div class="login">
            <div>
                <img src="https://mybk.hcmut.edu.vn/tuyensinh/img/logo/Logo2.png" alt="Logo đại học Bách Khoa TPHCM" />
                <h1>Trường đại học Bách Khoa TP.HCM</h1>
                <h2>Nhóm: SE with Da Bois</h2>
                <h3>UWC-2.0 Task management interface</h3>
            </div>
            <div onSubmit={ formSubmit }>
                <form class="loginForm">
                    <label for="text">Tài khoản</label>
                    <input type="username" placeholder="Nhập tài khoản" name="username" onChange={ formChange } />
                    <label for="password">Mật khẩu</label>
                    <input type="password" placeholder="Nhập mật khẩu" name="password" onChange={ formChange } />
                    <input type="submit" value="Đăng nhập" class="loginButton" />
                </form>
            </div>
        </div>
    )
}