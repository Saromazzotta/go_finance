import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import Footer from './Footer';



const LoginForm = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
    })

    const [errors, setErrors] = useState({});

    // Handle form input changes
    const changeHandler = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    // Handle form submission
    const submitHandler = (e) => {
        e.preventDefault();

        
        axios.post("http://localhost:8080/api/users/login", userInfo, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => {
                console.log(res)
                navigate('/dashboard')
            })
            .catch(err => {
                console.log(err);
                setErrors({ message: "Login failed. Please try again." })
            
            });
        
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <NavBar />
            <div className="container flex-grow-1 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="row mx-auto">
                    {/* Login Form */}
                    <div className="col-lg">
                        <form onSubmit={submitHandler}>
                            <h2 className="text-center fw-bold fst-italic mb-4">Login</h2>
                            <div className="form-group">
                                <label htmlFor="loginEmail" className="form-label">Username:</label>
                                <input type="text" className="form-control" id="loginUsername" name="username" value={userInfo.username} onChange={changeHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="loginPassword" className="form-label">Password:</label>
                                <input type="password" className="form-control" id="loginPassword" name="password" value={userInfo.password} onChange={changeHandler} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary mt-3 fw-bold">Login</button>
                            </div>
                        </form>
                        <span>Not Registered? <br/> Click <Link to='/register'>Here</Link></span>
                    </div>


                </div>
            </div>
            <Footer />
        </div>
        
    );



}


export default LoginForm