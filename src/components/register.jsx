import React from 'react'
import { toast } from 'react-toastify';

export default function Register() {

    const handleSubmit = () => {
        toast.success("Submitted...");
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
                            <label for="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10 mb-auto">
                                <input type="email" className="form-control" id="inputEmail3"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="inputPassword3"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success">Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </center>
    )
}
