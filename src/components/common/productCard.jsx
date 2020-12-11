import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import noImage from '../../assets/images/not_found.png';
import logo from '../../assets/images/logo.png';

function ProductCard({ data }) {
    const [quantity, setQuantity] = useState(1);

    const modifyQuantity = (action) => {
        if (action === "+") setQuantity(quantity+1);
        else if (quantity > 1) setQuantity(quantity-1);
    }

    return (
        <div className="card-transparent border-dark mb-4">
            <Link to="/home">
                <img
                    src={ logo }
                    onError={(e) => {e.target.onerror = null; e.target.src=noImage}}
                    className="card-img-top"
                    alt="Display Name"
                />
            </Link>
            <div className="card-body">
                <div className="card-title h-40 text-white">
                    <h5>
                        <strong>{data.displayName}</strong>
                    </h5>
                </div>
                <div className="text-white">
                    Price: ${data.price}
                </div>
            </div>
            <div className="card-footer text-white">
                <div className="d-flex justify-content-between align-items-center h-25">
                    <div className="input-group">
                        <div class="input-group-append">
                            <button
                                className="btn btn-success btn-sm"
                                type="button"
                                onClick={() => modifyQuantity('-')}
                            >-</button>
                        </div>
                        <input
                            className="form-control-sm product-quantity input-group-append"
                            type="text"
                            value={quantity}
                            disabled
                        />
                        <div class="input-group-append">
                            <button
                                className="btn btn-success btn-sm"
                                type="button"
                                onClick={() => modifyQuantity('+')}
                            >+</button>
                        </div>
                    </div>
                    <div>
                        Add
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;