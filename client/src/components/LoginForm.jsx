import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import Footer from './Footer';



const LoginForm = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [errors, setErrors] = useState({});

    const changeHandler = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }


    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/api/users/register", userInfo, { withCredentials: true })
            .then(res => {
                console.log(res)
                navigate('/dashboard')
            })
        .catch(err => console.log(err))
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <NavBar />
            <div className="container mt-5 flex-grow-1">
                <div className="row">
                    {/* Login Form */}
                    <div className="col-md-3">
                        <form>
                            <h2 className="text-center fw-bold fst-italic mb-4">Login</h2>
                            <div className="form-group">
                                <label htmlFor="loginEmail" className="form-label">Email:</label>
                                <input type="email" className="form-control" id="loginEmail" name="email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="loginPassword" className="form-label">Password:</label>
                                <input type="password" className="form-control" id="loginPassword" name="password" />
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