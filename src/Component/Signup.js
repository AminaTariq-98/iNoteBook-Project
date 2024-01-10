import React, { useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Signup = (props) => {

  const navigate = useNavigate();
  const [credential, setCredential] = useState({name: ' ', email: ' ', password: ' ' , cpassword: ' '})

  const handleSubmit = async (e) => {
      e.preventDefault();
      const {name, email, password} = credential
      const response = await fetch("http://localhost:4000/api/auths/user", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({name, email, password}),
      });
      const json = await response.json();
      console.log(json)
      if(json.success){
        localStorage.setItem('token', json.authtoken)
        navigate('/');
        props.showAlert("Account Created Successfully", "success")
      }
      else{
          props.showAlert("Invalid credentials", "danger")
      }
  }

  const onChange = (e) => {
      setCredential({ ...credential, [e.target.name]: e.target.value })
  }


  return (
    <div>
      <section className="vh-80" style={{ marginTop: '10px', marginLeft: '-50px' }}>
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
                  <h2 className="lead my-2" style={{ fontSize: '35px' }}>Sign Up</h2>
                </div>
                <div className="form-outline mb-4">
                  <input type="text" id="name" className="form-control form-control-lg"
                    placeholder="Enter your name"
                    name='name'
                    value={credential.name}
                    onChange={onChange}
                  />
                  <label className="form-label" htmlFor="text">Enter Name</label>
                </div>
                <div className="form-outline mb-4">
                  <input type="email" id="email" className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    name='email'
                    value={credential.email}
                    onChange={onChange}
                  />
                  <label className="form-label" htmlFor="email">Enter Email</label>
                </div>
                <div className="form-outline mb-3">
                  <input type="password" id="password" className="form-control form-control-lg"
                    placeholder="Enter password"
                    name='password'
                    value={credential.password}
                    onChange={onChange}
                    minLength={5} required
                  />
                  <label className="form-label" htmlFor="form3Example4">Enter Password</label>
                </div>
                <div className="form-outline mb-3">
                  <input type="password" id="cpassword" className="form-control form-control-lg"
                    placeholder="Confirm password"
                    name='cpassword'
                    value={credential.cpassword}
                    onChange={onChange}
                    minLength={5} required
                  />
                  <label className="form-label" htmlFor="cpassword">Confirm Password</label>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button onClick={handleSubmit} type="button" className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: '2.5rem' }}>SignUp</button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Do have an account? <NavLink to='/login'
                    className="link-danger">Login</NavLink></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Signup
