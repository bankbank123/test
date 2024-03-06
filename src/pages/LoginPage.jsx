import { useState, useRef } from 'react';
import axiosClient from '../axiosClient';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from "../ContextProvider.jsx";
import Dog from '../assets/dog-background.png';
import '../css/LoginPage.css';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setUser, setToken } = useStateContext()
  const [errors, setErrors] = useState(null)

  const onSubmit = ev => {
    ev.preventDefault()
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    console.log(payload)
    axiosClient.post('/login', payload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token);
        navigate('/');
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  return (
    <div className='container'>
      <div className="rain">
        <img src={Dog} alt="Dog-image" style={{ "--i": 12 }} />
        <img src={Dog} alt="Dog-image" style={{ "--i": 14 }} />
        <img src={Dog} alt="Dog-image" style={{ "--i": 13 }} />
        <img src={Dog} alt="Dog-image" style={{ "--i": 11 }} />
        <img src={Dog} alt="Dog-image" style={{ "--i": 15 }} />
        <img src={Dog} alt="Dog-image" style={{ "--i": 17 }} />
        <img src={Dog} alt="Dog-image" style={{ "--i": 20 }} />
        <img src={Dog} alt="Dog-image" style={{ "--i": 18 }} />
        <img src={Dog} alt="Dog-image" style={{ "--i": 19 }} />
        <img src={Dog} alt="Dog-image" style={{ "--i": 10 }} />
        <img src={Dog} alt="Dog-image" style={{ "--i": 23 }} />
        <img src={Dog} alt="Dog-image" style={{ "--i": 21 }} />
        <img src={Dog} alt="Dog-image" style={{ "--i": 20 }} />
        <img src={Dog} alt="Dog-image" style={{ "--i": 19 }} />
        <img src={Dog} alt="Dog-image" style={{ "--i": 14 }} />
      </div>
      <div className="login-container">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>
          <span className='line'></span>
          <h3>Email</h3>
          <input ref={emailRef} type="email" placeholder="Email" className='input-email input-login'/>
          <h3>Passowrd</h3>
          <input ref={passwordRef} type="password" placeholder="Password" className='input-password input-login'/>
          <button className="btn-login">Login</button>
          <p className="message">
            Not registered? <Link to="/signup">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;