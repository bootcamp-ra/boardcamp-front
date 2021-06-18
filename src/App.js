import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Sidebar from './components/Sidebar';
import View from './components/View';
import NewRentalButton from './components/NewRentalButton';

import Rentals from './pages/Rentals';
import Customers from './pages/Customers';
import Games from './pages/Games';
import Categories from './pages/Categories';
import NewRental from './pages/NewRental';
import Customer from './pages/Customer';
import NewCustomer from './pages/NewCustomer';
import NewCategory from './pages/NewCategory';
import NewGame from './pages/NewGame';

import './assets/styles/reset.css';
import './assets/styles/style.css';

export default function App () {
  return (
    <Router>
      <View>
        <Sidebar />

        <Switch>
          <Route path="/" exact>
            <Redirect to="/rentals" />
          </Route>

          <Route path="/rentals" exact>
            <Rentals />
          </Route>

          <Route path="/customers" exact>
            <Customers />
          </Route>

          <Route path="/games" exact>
            <Games />
          </Route>

          <Route path="/categories" exact>
            <Categories />
          </Route>

          <Route path="/rentals/new" exact>
            <NewRental />
          </Route>

          <Route path="/customers/new" exact>
            <NewCustomer />
          </Route>

          <Route path="/customers/:customerId" exact>
            <Customer />
          </Route>

          <Route path="/categories/new" exact>
            <NewCategory />
          </Route>

          <Route path="/games/new" exact>
            <NewGame />
          </Route>
        </Switch>
        
        <NewRentalButton />
      </View>
    </Router>
  );
}
