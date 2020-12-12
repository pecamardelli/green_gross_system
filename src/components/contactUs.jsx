import React, { useRef } from 'react'
import { toast } from 'react-toastify';

export default function ContactUs() {
    const msgRef = useRef();

    const handleSubmit = () => {
        const msg = msgRef.current.value;
        if (msg) toast.success("Message successfully sent!");
        else return toast.error("Please, write a message.");
        msgRef.current.value = "";
    };

    return (<center>
        <div className="register-form text-white">
            <div className="card-transparent">
                <div className="card-body">
                    <h3>Contact us and we will respond as soon as possible!</h3>
                </div>
            </div>
            <br />
            <div className="card-transparent border-dark mb-3">
                <div className="card-header">
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor="message">
                                <h5>Write your message here:</h5>
                            </label>
                            <textarea
                                className="form-control"
                                id="message"
                                rows="3"
                                ref={msgRef}
                            >
                            </textarea>
                        </div>
                        <div className="form-group">
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={handleSubmit}
                            >Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </center>
    )
}
