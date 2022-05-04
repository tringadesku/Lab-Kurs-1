import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Home} from './Components/Home';
import {AddDhoma} from './Components/AddDhoma';
import {EditDhoma} from './Components/EditDhoma';
import {Nav} from './Components/Nav'
import { Dhomat } from "./Components/Dhomat";


function App(){
  return(
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/dhomat" component={Dhomat}/>
          <Route exact path="/addDhoma" component={AddDhoma}/>
          <Route path="/editDhoma/:id" component={EditDhoma}/>
        </Switch>
      </Router>
    </div>

  );
}

export default App;