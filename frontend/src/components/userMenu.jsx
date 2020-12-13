import React, { useContext } from 'react';
import { getCartIcon, getLogoutIcon } from '../assets/icons';
import UserContext from './../context/userContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function UserMenu(props) {
    const {userData, setUserData} = useContext(UserContext);

    const handleLogout = () => {
        localStorage.removeItem('userData');
        setUserData({});
        toast.success("User logged out.");
    };

    const getItemCount = () => {
        let count = 0;
        for (let item of userData.wishList) {
            count += item.number;
        }
        return count;
    };
    
    return (
        <div className="user-menu text-white d-flex justify-content-between align-items-center">
            <div>Hello, {userData.username}!</div>
            &nbsp;
            <div>
                <Link to='/wishlist'>
                    {getCartIcon('1.4em')}
                </Link>
            </div>
            &nbsp;
            <div className="badge badge-success badge-pill">
                { userData.wishList ? getItemCount() : 0 }
            </div>
            &nbsp;
            <div onClick={handleLogout} >{getLogoutIcon('1.4em')}</div>
        </div>
    );
}

export default UserMenu;