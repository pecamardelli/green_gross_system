import './App.css';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Redirect, Route, Switch } from 'react-router-dom';
import NavBar from './components/common/navBar';
import Footer from './components/common/footer';
import Register from './components/register';
import Home from './components/home';
import AboutUs from './components/aboutUs';
import ContactUs from './components/contactUs';
import NotFound from './components/common/notFound';
import WishList from './components/wishList';
import UserContext from './context/userContext';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const jsonData = localStorage.getItem('userData');
    if (jsonData) setUserData(JSON.parse(jsonData));
  }, [setUserData])

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <ToastContainer />
      <NavBar />
      <main className='container'>
        <Switch>
          <Route path="/register"   exact component={Register} />
          <Route path="/about-us"   exact component={AboutUs} />
          <Route path="/contact-us" exact component={ContactUs} />
          <Route path="/wishlist"   exact component={WishList} />
          <Route path='/not-found'	exact component={NotFound} />
          <Route path='/home'       exact component={Home} />
          <Redirect from="/" to='/home' />
          <Redirect to='/not-found' />
        </Switch>
      </main>
      <Footer />
    </UserContext.Provider>
  );
}

export default App;
