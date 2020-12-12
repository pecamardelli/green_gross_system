import React, { useContext, useState } from 'react';
import noImage from '../../assets/images/not_found.png';
//import logo from '../../assets/images/logo.png';
import icons from '../../assets/icons';
import { toast } from 'react-toastify';
import UserContext from './../../context/userContext';

function ProductCard({ data }) {
    const [quantity, setQuantity] = useState(1);
    const {userData, setUserData} = useContext(UserContext);

    const modifyQuantity = (action) => {
        if (action === "+") setQuantity(quantity+1);
        else if (quantity > 1) setQuantity(quantity-1);
    }

    const addToCart = () => {
        if (userData.username) {
            const tempUserData = JSON.parse(JSON.stringify(userData));

            let wishList = userData.wishList;
            if (!wishList) wishList = [];

            const item = wishList.find(i => i.id === data.id);
            if (!item) {
                const newItem = {
                    ...data,
                    number: quantity
                };
                wishList.push(newItem);
            }
            else {
                const index = wishList.indexOf(item);
                wishList[index].number += quantity;
            }

            tempUserData.wishList = wishList;
            localStorage.setItem('userData', JSON.stringify(tempUserData));
            setUserData(tempUserData);

            toast.success(`Added ${quantity} products to cart.`);
        }
        else toast.error(`Please, register first.`);
    }

    return (
        <div className="card-transparent border-dark mb-4">
            <img
                src={`images/${data.imageFile}`}
                onError={(e) => {
                    e.target.onerror = null;
                    // This conditional prevents an infinite fallback loop
                    // when noImage is not available or undefined
                    if(noImage) e.target.src=noImage;
                    else e.target.src=''
                }}
                className="card-img-top"
                alt={data.displayName}
            />
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
                        <div className="input-group-append">
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
                        <div className="input-group-append">
                            <button
                                className="btn btn-success btn-sm"
                                type="button"
                                onClick={() => modifyQuantity('+')}
                            >+</button>
                        </div>
                    </div>
                    <div>
                        <span onClick={addToCart}>{icons.addToCartIcon()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;