import React, { useState } from 'react';
import Router from "next/router";
// import './LoginScreen.css';

function LoginScreen() {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(email)
        console.log(password)
        if(email === "admin@gmail.com"){
            if(password === "1234567890"){
                localStorage.setItem("userLogin",true)
                Router.push("/home")
            }else{
                alert("Worn Password")
            }
        }else{
            alert("Wrong email")
        }
    }
  return (
    <div className="container-fluid cus-h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title text-center text-black mb-0">Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email"  onChange={(val) => setEmail(val.target.value)} className="form-control" id="email" placeholder="Enter email" />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password"  onChange={(val) => setPassword(val.target.value)} className="form-control" id="password" placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-primary d-block w-100">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
