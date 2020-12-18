import React, { useContext } from 'react';
import UserContext from './../context/userContext';
import noImage from '../assets/images/not_found.png';
import { getTrashIcon, getBuyedIcon } from '../assets/icons';
import { toast } from 'react-toastify';
import BingMaps from './bingMaps';

function WishList(props) {
    const {userData, setUserData} = useContext(UserContext);

    const handleDelete = (itemId) => {
        const tempUserData = JSON.parse(JSON.stringify(userData));
        const index = tempUserData.wishList.findIndex(i => i.id === itemId);
        tempUserData.wishList.splice(index,1);

        localStorage.setItem('userData', JSON.stringify(tempUserData));
        setUserData(tempUserData);
    };

    const getSaleTotal = () => {
        if (!userData.wishList) return 0;

        let total = 0;
        for (let item of userData.wishList) {
            total += item.price * item.number;
        }

        return Math.round(total*100)/100;
    };

    const handleCheckout = () => {
        if (getSaleTotal() === 0)
            return toast.error("You don't have any items in your cart!");

        toast.success(`Thanks for buying!`);
        const tempUserData = JSON.parse(JSON.stringify(userData));
        tempUserData.wishList = [];
        localStorage.setItem('userData', JSON.stringify(tempUserData));
        setUserData(tempUserData);
    };

    return (<>
        <div className="card-transparent wish-list">
            <div className="card-body">
                <div className="card-title h-40 text-white">
                    <h5>
                        <strong>Wishlist of {userData.username}</strong>
                    </h5>
                </div>
                <table className="table text-white">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Product</th>
                            <th scope="col">Base price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Subtotal</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.wishList?.map(item =>
                            <tr key={item.id}>
                                <td style={{ width: '7%' }}>
                                    <img
                                        className="card-img"
                                        src={`images/${item.imageFile}`}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            // This conditional prevents an infinite fallback loop
                                            // when noImage is not available or undefined
                                            if(noImage) e.target.src=noImage;
                                            else e.target.src=''
                                        }}
                                        alt={item.displayName}
                                    />
                                </td>
                                <td>
                                    <h6 style={{ margin: '2px 0 0 0'}}>
                                        <strong>{item.displayName}</strong>
                                    </h6>
                                </td>
                                <td>
                                    <h6 style={{ margin: '2px 0 0 0'}}>
                                        ${item.price}
                                    </h6>
                                </td>
                                <td>
                                    <h5 style={{ margin: '2px 0 0 0'}}>
                                        {item.number}
                                    </h5>
                                </td>
                                <td>
                                    <h6 style={{ margin: '2px 0 0 0'}}>
                                        <strong>${Math.round(item.number * item.price*100)/100}</strong>
                                    </h6>
                                </td>
                                <td>
                                    <span onClick={() => handleDelete(item.id)}>{ getTrashIcon() }</span>
                                </td>
                            </tr>
                        )}
                        <tr>
                            <td colSpan='3'></td>
                            <td className='text-right'>
                                <h5><strong>Total</strong></h5>
                            </td>
                            <td>
                                <h5><strong>${getSaleTotal()}</strong></h5>
                            </td>
                            <td>
                                <span onClick={handleCheckout}>{getBuyedIcon()}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <BingMaps />
    </>);
}

export default WishList;