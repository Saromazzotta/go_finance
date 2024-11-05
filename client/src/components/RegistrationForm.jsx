import React from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import Footer from './Footer'

function RegistrationForm() {
    return (
        <div className="d-flex flex-column min-vh-100"> {/* Full viewport height, flex layout */}
            <NavBar />
            <div className="container mt-5 flex-grow-1">
                <div className="row">
                    <div className="col-md-3">
                        <form>
                            <h2 className="text-center fw-bold fst-italic mb-4">Register</h2>
                            <div className="form-group">
                                <label htmlFor="firstName" className="form-label">First Name:</label>
                                <input type="text" className="form-control" id="firstName" name="firstName" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName" className="form-label">Last Name:</label>
                                <input type="text" className="form-control" id="lastName" name="lastName" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="registerEmail" className="form-label">Email:</label>
                                <input type="email" className="form-control" id="registerEmail" name="email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="registerPassword" className="form-label">Password:</label>
                                <input type="password" className="form-control" id="registerPassword" name="password" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                                <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" />
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