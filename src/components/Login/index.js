import {useState} from 'react'
import Cookies from 'js-cookie'
import {useNavigate,Navigate} from 'react-router-dom';
import './index.css'

const Login = () => {
    const [inputFieldValue,setinputField] = useState("");
    const [passwordFieldValue,setPasswordField] = useState("");
    const [errMsg,seterrMsg] = useState("");

    const navigate = useNavigate();
    
    const jwtToken = Cookies.get("jwt_token");
    if(jwtToken){
       return <Navigate to="/" replace/>
    }


    const updateInputField = e => {
        setinputField(e.target.value);
    }

    const updatePasswordField = e => {
        setPasswordField(e.target.value);
    }

    const onLoginSucess = () => {
        setinputField("");
        setPasswordField("");
        seterrMsg("");
        navigate("/",{replace:null});
    }
    const onLoginFailure = errorMessage =>{
        seterrMsg(errorMessage);
    }

    const submitFormToLogin = async (e) => {
        e.preventDefault();
        const userDetails = {
            username:inputFieldValue,
            password:passwordFieldValue
        };
        const url = "https://apis.ccbp.in/login";
        const options = {
            method:"POST",
            body:JSON.stringify(userDetails),
        }
        const response = await fetch(url,options);
        if(response.ok===true){
            const data = await response.json();
            const jwtToken = data.jwt_token;
            Cookies.set("jwt_token",jwtToken,{expires:30});
            onLoginSucess();
        }else{
            const data = await response.json();
            const errorMessage = data.error_msg;
            onLoginFailure(errorMessage);
        }
    }

return (
  <div className='login-page'>
    <form className='login-form' onSubmit = {submitFormToLogin}>
          <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" alt="website-logo" className='website-logo'/>
        <div className='input-field-container'>
            <label htmlFor="username" className="input-field-label">USERNAME</label>
            <input type="text" id="username" autoComplete = 'on' value={inputFieldValue} onChange={updateInputField} />
        </div>
        <div className='password-field-container'>
            <label htmlFor='password' className='input-field-label'>PASSWORD</label>
            <input type="text" id="password" value={passwordFieldValue} onChange={updatePasswordField} />
        </div>
        <div>   
            {errMsg && <p className="err-msg">{errMsg}</p>}
        </div>
        <div>
            <button type="submit" className='submit-button'>Submit</button>
        </div>
    </form>
  </div>
)
};

export default Login;