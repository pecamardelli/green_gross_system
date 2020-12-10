import './App.css';
import NavBar from './components/common/navBar';
import Footer from './components/common/footer';
import { Redirect, Route, Switch } from 'react-router-dom';
import Register from './components/register';
import Home from './components/home';
import AboutUs from './components/aboutUs';
import ContactUs from './components/contactUs';
import NotFound from './components/common/notFound';

function App() {
  return (<>
        <NavBar />
        <main className='container'>
            <Switch>
                <Route path="/register"   exact component={Register} />
                <Route path="/about-us"   exact component={AboutUs} />
                <Route path="/contact-us" exact component={ContactUs} />
                <Route path='/not-found'	exact component={NotFound} />
                <Route path='/home'       exact component={Home} />
                <Redirect from="/" to='/home' />
                <Redirect to='/not-found' />
            </Switch>
        </main>
        <Footer />
      </>
  );
}

export default App;
