import React from 'react'

function RegistrationForm() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
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
                </div>

            </div>
            {/* Registration Form */}
            

        </div>
    )
}

export default RegistrationForm