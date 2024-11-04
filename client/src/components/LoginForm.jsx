import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



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
        <div className="container mt-5">
            <div className="row">
                {/* Login Form */}
                <div className="col-md-6">
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
                </div>

                
            </div>
        </div>
    );



}


export default LoginForm