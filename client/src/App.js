import './App.css';
import {BrowserRouter,Routes,Route,Switch,Link} from 'react-router-dom';
import ListShips from './components/ListShip';
import AddShip from './components/AddShip';
import EditShip from './components/EditShip';

function App() {
  return (
    <div className="container">
      <Switch>
        <Route path='/' exact>
            <ListShips/>
        </Route>
        <Route path='/add'>
          <AddShip/>
        </Route>
        <Route path='/edit'>
          <EditShip />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
