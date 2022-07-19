import '../Login/login.css';
import LoginService from '../../Service/LoginService';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login(){
    let navigate = useNavigate();
    const check = (event) => {
        event.preventDefault();
        let object = {
            userName: event.target.userName.value,
            password: event.target.password.value,
        }
        console.log(object);
            LoginService.checkLogin(object).then((reasponse) =>{
                if(reasponse.data.contactData === true){
                    alert("Welcome " + object.userName + " click ok to see saved contact details");
                    navigate(`/home`)
                } else{
                    alert("Login Unsuccessfull");
                }
            })
    }

    return(
        <>
        <div className="loginPage">
            <div className="login_text">
                LOGIN PAGE
            </div>
            <div className="body">
                <form onSubmit={check}>
                    <div className="label">
                        <label>User Name</label>                        
                        <input type='text' id='userName' name="userName" className='input'/>
                    </div>
                    <div className="label">
                        <label>Password</label>
                        <input type='text' id='password' name="password" className='input'/>
                    </div>
                    <div>
                    <button className='button'>Login</button></div>
                    <div>or</div>
                    <Link to='/register'>
                    <button className='button'>SignUp</button></Link>
                </form>
            </div>
        </div>
        </>
    );
}

export default Login;