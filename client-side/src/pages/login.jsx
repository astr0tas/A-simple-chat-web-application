import account from '../data/account.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';

export const Login = () =>
{
    const [inputs, setInputs] = useState({});

    const Navigate = useNavigate();

    const handleChange = (event) =>
    {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }


    const handleSubmit = (event) =>
    {
        event.preventDefault();
        if (account.username === inputs.username && account.password === inputs.password)
            Navigate("/sideMenu/workerList/janitorList");
        else
        {
            window.alert("Tài khoản đăng nhập hoặc mật khẩu sai");
            document.getElementsByClassName("loginForm")[0].reset();
        }
    }

    return (
        <div class="login">
            <div>
                <img src="https://mybk.hcmut.edu.vn/tuyensinh/img/logo/Logo2.png" alt="Logo đại học Bách Khoa TPHCM" />
                <h1>Trường đại học Bách Khoa TP.HCM</h1>
                <h2>Nhóm: SE with Da Bois</h2>
                <h3>UWC-2.0 Task management interface</h3>
            </div>
            <div onSubmit={ handleSubmit }>
                <form class="loginForm">
                    <label for="text">Tài khoản</label>
                    <input type="username" placeholder="Nhập tài khoản" name="username" onChange={ handleChange } />
                    <label for="password">Mật khẩu</label>
                    <input type="text" placeholder="Nhập mật khẩu" name="password" onChange={ handleChange } />
                    <input type="submit" value="Đăng nhập" class="loginButton" />
                </form>
            </div>
        </div>
    )
}