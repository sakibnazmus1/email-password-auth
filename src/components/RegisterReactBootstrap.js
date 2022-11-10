import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import app from "../firebase/firebase.init";


const auth = getAuth(app);


const RegisterReactBootstrap = () => {
    const [passwordError, setpasswordError] = useState('')
    const [success, setSuccess] = useState(false);
    const handleRegister = event => {
        event.preventDefault();
        setSuccess(false);
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        // /validate password/ 

        // if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
        //     setpasswordError('Please provide at least two uppercase');
        //     return;
        // }
        if (password.length < 6) {
            setpasswordError('Please should be at least 6 character');
            return;
        }
        if (!/(?=.*[!@#$&*])/.test(password)) {
            setpasswordError('Please at least 1 special character');
            return;
        }
        setpasswordError('');
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true);
                form.reset();
                verifyEmail();
                updateUserName(name);
            })
            .catch(error => {
                console.error('error', error);
                setpasswordError(error.message)
            })
    }

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert('Please check your email and verify your email address.')
            })
    }

    const updateUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
            .then(() => {
                console.log('display name updated')
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <div className='w-50 mx-auto'>
            <h2 className='text-danger'>Please Register!!!</h2>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Enter Name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>
                <p className="text-danger">{passwordError}</p>
                {success && <p className="text-success">User Createrd Succesfully.</p>}
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <br />
            <p><small> Already have an account? Please  <Link to='/login'>Log In</Link></small></p>
        </div>
    );
};

export default RegisterReactBootstrap;