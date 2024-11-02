import React, { useState } from 'react'



const LoginForm = () => {
    // const navigate = useNavigate();
    // const [userInfo, setUserInfo] = useState({
    //     email: "",
    //     password: ""
    // })

    return (
        <div className='col-5 mt-3  fw-bold'>
            <form >
                <h2 className='text-center fw-bold fst-italic'>Login</h2>
                <div className='form-group'>
                    <label htmlFor="" className="form-label">Email:</label>
                    <input type="email" className="form-control" name="email" />
                </div>
                <div className='form-group'>
                    <label htmlFor="" className="form-label">Password:</label>
                    <input type="pasword" className="form-control" name="password" />
                </div>
                <div className='form-group'>
                    <button type="submit" className="btn btn-primary mt-3 fw-bold">Login</button>
                </div>

            </form>
        </div>
    )


}


export default LoginForm;