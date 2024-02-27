import  { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
   const [name, setName] = useState("")
   const [email, setEmail] = useState("")
   const [password ,setPassword] = useState("")
   const [pic, setPic] = useState("")

    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("User")) {
            navigate("/home")
        }
    },[navigate])

    const onClick = async (e) => {
      e.preventDefault();
          register()
    }
    const register = async() => {
const response = await axios.post("http://localhost:3003/signup", {
   
    "name" : name,
    "email" : email,
    "password" : password,
    "pic" : pic
})
        if(response.status == 200){
            toast.success("great!");
            navigate("/")
        }
    }

  return (
<>
<div className = "container">
    <div>
        <h1>RegisterPage</h1>
    </div>
 
  <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
    <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} id="exampleFormControlInput1" placeholder="name" />
  </div> 
  <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
    <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} id="exampleFormControlInput1" placeholder="email" />
  </div> 
  <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} id="exampleFormControlInput1" placeholder="password" />
  </div> 
  <div className="mb-3">
    <label htmlFor="exampleFormControlInput1" className="form-label">Picture URL</label>
    <input type="text" className="form-control" onChange={(e) => setPic(e.target.value)} id="exampleFormControlInput1" placeholder="url Image" />
  </div> 
    
  <div className="mb-3">
  <button type="button" className="btn btn-dark" onClick={onClick}>
      Register
    </button>
  </div>
    <div className="mb">
        <Link to = "/"> Sign In</Link>    
    </div>
    <ToastContainer />

</div>
</>
  )
}

export default RegisterPage