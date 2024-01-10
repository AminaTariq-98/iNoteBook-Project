import React, { useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Login = (props) => {

    const navigate = useNavigate();
    const [credential, setCredential] = useState({ email: ' ', password: '' })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/api/auths/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credential.email, password: credential.password }),
        });
        const json = await response.json();
        console.log(json)
        if(json.success){
          localStorage.setItem('token', json.authtoken)
          props.showAlert("Login Successfully", "success")
          navigate('/');
        }
        else{
             props.showAlert("Invalid Credientials", "danger")
        }
    }

    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <section className="vh-80 my-5" style={{ marginTop: '40px', marginLeft: '-50px' }}>
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt=" "
                            />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <h2 className="lead my-2" style={{ fontSize: '35px' }}>Login</h2>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="email" id="email" className="form-control form-control-lg"
                                        placeholder="Enter a valid email address"
                                        name='email'
                                        value={credential.email}
                                        onChange={onChange}
                                    />
                                    <label className="form-label" htmlFor="form3Example3">Enter Email</label>
                                </div>
                                <div className="form-outline mb-3">
                                    <input type="password" id="password" className="form-control form-control-lg"
                                        placeholder="Enter password"
                                        name='password'
                                        value={credential.password}
                                        onChange={onChange}
                                    />
                                    <label className="form-label" htmlFor="form3Example4">Enter Password</label>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="form-check mb-0">
                                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                        <label className="form-check-label" htmlFor="form2Example3">
                                            Remember me
                                        </label>
                                    </div>
                                    <NavLink to='/forget' className="text-body">Forgot password?</NavLink>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button onClick={handleSubmit} type="button" className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: "2.5rem", paddingRight: '2.5rem' }}>Login</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <NavLink to='/signup'
                                        className="link-danger">Register</NavLink></p>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login
