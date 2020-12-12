import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import UserContext from './../context/userContext';

export default function Register(props) {
    const [ userFormData, setUserFormData ] = useState({});
    const userContext = useContext(UserContext);

    if (userContext.userData.username) props.history.push('/not-found');

    const handleSubmit = () => {
        if (!userFormData.username ||
            !userFormData.email ||
            !userFormData.password) {
            toast.error("All fields are required.");
            return;
        }

        userContext.setUserData(userFormData);
        localStorage.setItem('userData', JSON.stringify(userFormData));
        props.history.push('/home');
    }

    const handleChange = (e) => {
        //console.log(e.target);
        const aux = { ...userFormData };
        aux[e.target.id] = e.target.value;
        setUserFormData(aux);
    }

    return (<center>
        <div className="register-form text-white">
            <div className="card-transparent">
                <div className="card-body">
                    <h3>Sign up to the Green Gross System!</h3>
                </div>
            </div>
            <br />
            <div className="card-transparent border-dark mb-3">
                <div className="card-header">
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                            <div className="col-sm-10 mb-auto">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10 mb-auto">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={handleSubmit}
                            >Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </center>
    )
}
