import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Container from './components/layout/Container';

import Message from './components/layout/Message';

import Register from './components/pages/Auth/Register';
import Login from './components/pages/Auth/Login';
import Home from './components/pages/Home';

import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar/>
        <Message/>
        <Container>
          <Switch>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/register">
              <Register/>
            </Route>
            <Route path="/" exact>
              <Home/>
            </Route>
          </Switch>
        </Container>
        <Footer/>
      </UserProvider>
    </Router>
  );
}

export default App;
