import { Link, useNavigate } from 'react-router-dom';
import '../Login/login.css';
import RegistrationService from '../../Service/RegistrationService';

const Registration = (props) => {
    let navigate = useNavigate();

    const save = (event) => {
        event.preventDefault();
        let object = {
            userName: event.target.userName.value,
            emailID: event.target.emailID.value,
            password: event.target.password.value,
        }
        console.log(object);
            RegistrationService.addUser(object).then((reasponse) =>{
                    alert("Registrated successfully");
                    navigate(`/login`);
            })
    }
    return(
        <div className="loginPage">
            <div className="login_text">
                LOGIN PAGE
            </div>
            <div className="body">
                <form onSubmit={save}>
                    <div className="login_label">
                        <label>User Name</label>
                        <input id='userName' name="userName" type='text'></input>
                    </div>
                    <div className="email_label">
                        <label>Email</label>
                        <input id='emailID' name="emailID" type='text'></input>
                    </div>
                    <div className="password_label">
                        <label>Password</label>
                        <input id='password' name="password" type='text'></input>
                    </div>
                    <button className='signup_button'>SignUp</button>
                    <Link to='/login'>
                        <button>Back to home</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Registration;