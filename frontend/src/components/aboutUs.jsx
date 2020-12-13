import React from 'react';
import {getAtIcon, getMailIcon} from '../assets/icons';
import logo from '../assets/images/logo.png';

export default function AboutUs() {
    return (<center>
        <div className="card-transparent mb-3 text-white" style={{ maxWidth: '70%'}}>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img
                        src={logo}
                        className="card-img"
                        width="80%"
                        style={{ margin: '10px 10px 10px 10px'}}
                        alt=""
                        loading="lazy"
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h4 className="card-title">We are Green Gross System. Our motto is to provide our clients fresh vegetables and fruits while saving their precious time.</h4>
                        <p className="card-text">Vivamus dapibus, turpis convallis dapibus viverra, massa nunc auctor odio, eget varius turpis odio et massa.
                            Phasellus sed dictum tortor. Aenean quis ex ex. Praesent sed risus et ligula consequat sollicitudin.
                            In diam odio, sodales nec libero ut, posuere laoreet purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                        <div className="d-flex justify-content-between align-items-center">
                            { getAtIcon('1.6em') }
                            <h5>www.greengross.com</h5>
                            { getMailIcon('1.5em') }
                            <h5>sales@greengross.com</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </center>
    )
}
