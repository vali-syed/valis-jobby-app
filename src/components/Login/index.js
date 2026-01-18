import {useState} from 'react'
import './index.css'

const Login = () => {
    const [inputFieldValue,setinputField] = useState("");
    const [passwordFieldValue,setPasswordField] = useState("");

    const updateInputField = e => {
            console.log(e.target.value);
            setinputField(e.target.value);
    }

    const updatePasswordField = e => {
        setPasswordField(e.target.value);
    }

return (
  <div className='login-page'>
    <form className='login-form'>
          <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" alt="website-logo" className='website-logo'/>
        <div className='input-field-container'>
            <label htmlFor="username" className="input-field-label">USERNAME</label>
            <input type="text" id="username" value={inputFieldValue} onChange={updateInputField} />
        </div>
        <div className='password-field-container'>
            <label htmlFor='password' className='input-field-label'>PASSWORD</label>
            <input type="text" id="password" value={passwordFieldValue} onChange={updatePasswordField} />
        </div>
        <div>
            <button type="submit" className='submit-button'>Submit</button>
        </div>
    </form>
  </div>
)
};

export default Login;