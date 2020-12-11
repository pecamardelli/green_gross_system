import React        from 'react';
import { Link }     from 'react-router-dom';
import noImage from '../../assets/images/not_found.png';
import logo from '../../assets/images/logo.png';

function ProductCard({ data }) {
    return (
        <div className="card border-dark mb-4 product-card">
            <Link to="/home">
                <img
                    src={ logo }
                    onError={(e) => {e.target.onerror = null; e.target.src=noImage}}
                    className="card-img-top"
                    alt="Display Name"
                />
            </Link>
            <div className="card-body">
                <div className="card-title h-40">
                    <h5>
                        <strong>Display Name</strong>
                    </h5>
                </div>
                <div className="h-25">
                    Other stuff
                </div>
            </div>
        </div>
    );
}

export default ProductCard;