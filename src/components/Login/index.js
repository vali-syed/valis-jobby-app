import './index.css'

const Login = () => (
  <div className='login-page'>
    <form className='login-form'>
          <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" alt="website-logo" className='website-logo'/>
        <div className='input-field-container'>
            <label htmlFor="username" className="input-field-label">USERNAME</label>
            <input type="text" id="username"/>
        </div>
        <div className='password-field-container'>
            <label htmlFor='password' className='input-field-label'>PASSWORD</label>
            <input type="text" id="password" />
        </div>
        <div>
            <button type="submit" className='submit-button'>Submit</button>
        </div>
    </form>
  </div>
);

export default Login;