import { Link, useNavigate } from 'react-router-dom';
import '../Registration/Registration.css';
import RegistrationService from '../../Service/RegistrationService';

const Registration = (props) => {
    let navigate = useNavigate();

    /* 
    Abilty to save entered deatils
     */
    const save = (event) => {
        event.preventDefault();
        let object = {
            userName: event.target.userName.value,
            emailID: event.target.emailID.value,
            password: event.target.password.value,
        }
        console.log(object);
        RegistrationService.addUser(object).then(() =>{
                alert("Registrated successfully");
                navigate(`/login`);
        })
    }
    return(
/*===================================================================================================
                                HTML for Registration form
====================================================================================================== */
        <div className="loginPage">
{/* ----------------------------- Declaring body header ------------------------------------------ */}
            <div className="login_text">
                REGISTRATION PAGE
            </div>
            <div className="body">
                <form onSubmit={save}>

{/* ----------------------------- User name label ------------------------------------------ */}
                    <div className="label">
                        <label>User Name</label>
                        </div>
                        <input id='userName' name="userName" type='text' className='input'></input>  

{/* ----------------------------- Email label ------------------------------------------ */}                 
                    <div className="label">
                        <label>Email</label>
                        </div>
                        <input id='emailID' name="emailID" type='text' className='input'></input>  

{/* ----------------------------- Password label ------------------------------------------ */}                 
                    <div className="label">
                        <label>Password</label></div>
                        <input id='password' name="password" type='text' className='input'></input> 
                        <br/>         

{/* ----------------------------- signup and login button------------------------------------------ */}         
                    <button className='button'>SignUp</button>
                    <Link to='/login'>
                        <button className='button'>Login</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Registration;