import React from 'react';
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/firebase.init";

const auth = getAuth(app)

const LoginBootstrap = () => {
    const handleSubmit = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(error => {
                console.error('error', error)
            })
    }


    return (
        <div className='w-50 mx-auto'>
            <h3 className='text-success'>Please Login!!</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Example label</label>
                    <input type="email" name='email' className="form-control" id="formGroupExampleInput" placeholder="Your E-mail" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Another label</label>
                    <input type="password" name='password' className="form-control" id="formGroupExampleInput2" placeholder="Your Password" required />
                </div>
                <button className="btn btn-primary" type="submit">Login</button>
            </form>
            <br />
            <p><small>New to this Website? Please  <Link to='/register'>Register</Link></small></p>
        </div>
    );
};

export default LoginBootstrap;