import './App.css';
import Countries from './Components/Countries';
import CountryDetails from './Components/CountryDetails';
import {Route,Routes,Switch} from 'react-router-dom'
function App() {
  return (
    <div className="App">
        <Switch>
            <Route exact path="/">
                <Countries simplified />
            </Route>
            <Route exact path={'/countryDetails/:name'}>
              <CountryDetails />
            </Route>
          </Switch>
       
    </div>
  );
}

export default App;
