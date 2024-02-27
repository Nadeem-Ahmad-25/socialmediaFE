import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('User')) {
            navigate('/home');
        }
    }, [navigate]);

    const onClick = async () => {
        try {
            const response = await axios.post('http://localhost:3003/signin', {
                email: email,
                password: password,
                expiresIn: 60000,
            });
            if (response.status === 200) {
                const { token, user } = response.data;
                console.log(token)
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/home');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error('Invalid credentials');
        }
    };

    return (
        <>
            <div className="container">
                <div>
                    <h1>Login</h1>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        id="exampleFormControlInput1"
                        placeholder="name@example.com"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        id="exampleFormControlInput1"
                        placeholder="Password"
                    />
                </div>
                <div className="mb-3">
                    <button type="button" className="btn btn-dark" onClick={onClick}>
                        Login
                    </button>
                </div>
                <div className="mb">
                    <Link to="/register">
                        <u>if you are new here - Register here</u>
                    </Link>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};

export default LoginPage;
