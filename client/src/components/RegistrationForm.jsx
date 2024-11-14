import React from 'react'
import NavBar from './NavBar'
import { Link, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { useState } from 'react'

function RegistrationForm() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState({});

    // Handle form input changes
    const changeHandler = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    };


    // Handle form submission
    const submitHandler = (e) => {
        e.preventDefault();

        // Validation: check if password and confirm password match
        if (userInfo.password !== userInfo.confirmPassword) {
            setErrors({ password: "Passwords do not match" })
            return;
        }

        // Clear errors before making the request
        setErrors({});


        // Make API request to register the user
        axios.post("http://localhost:8080/api/users/register", userInfo, {
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
            .catch((err) => {
                console.log(err);
                // Set error message if registration fails
                setErrors({ message: "Registration failed. Please try again." });
            });
    }

    return (
        <div className="d-flex flex-column min-vh-100"> {/* Full viewport height, flex layout */}
            <NavBar />
            <div className="container flex-grow-1 d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="row mx-auto">
                    <div className="col-lg">
                        <form onSubmit={submitHandler}>
                            <h2 className="text-center fw-bold fst-italic mb-4">Register</h2>
                            <div className="form-group">
                                <label htmlFor="firstName" className="form-label">First Name:</label>
                                <input type="text" className="form-control" id="firstName" name="firstName" value={userInfo.firstName} onChange={changeHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName" className="form-label">Last Name:</label>
                                <input type="text" className="form-control" id="lastName" name="lastName" value={userInfo.lastName} onChange={changeHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="registerEmail" className="form-label">Email:</label>
                                <input type="email" className="form-control" id="registerEmail" name="email" value={userInfo.email} onChange={changeHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="registerPassword" className="form-label">Password:</label>
                                <input type="password" className="form-control" id="registerPassword" name="password" value={userInfo.password} onChange={changeHandler} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                                <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={userInfo.confirmPassword} onChange={changeHandler} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-success mt-3 fw-bold">Register</button>
                            </div>
                        </form>
                        <span>Already Registered? <br/> Click <Link to='/'>Here</Link></span>
                    </div>
                </div> 
            </div>
            <Footer />
        </div>
            
    )
}

export default RegistrationForm