import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Home} from './Components/Home';
import {AddDhoma} from './Components/AddDhoma';
import {EditDhoma} from './Components/EditDhoma';
import {Nav} from './Components/Nav'
import { Dhomat } from "./Components/Dhomat";
import { Pacientat } from "./Components/Pacientat";
import { AddPacienti } from "./Components/AddPacienti";
import { EditPacienti } from "./Components/EditPacienti";
import { Userat } from "./Components/Userat";
import { AddUser } from "./Components/AddUser";
import { EditUser } from "./Components/EditUser";
import { AddInfuzioni } from "./Components/AddInfuzioni";
import { EditInfuzioni } from "./Components/EditInfuzioni";
import { Infuzionet } from "./Components/Infuzionet";


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
          <Route path="/pacientat" component={Pacientat}/>
          <Route exact path="/addPacienti" component={AddPacienti}/>
          <Route path="/editPacienti/:id" component={EditPacienti}/>
          <Route path="/users" component={Userat}/>
          <Route exact path="/addUser" component={AddUser}/>
          <Route path="/editUser/:id" component={EditUser}/>
          <Route path="/infuzionet" component={Infuzionet}/>
          <Route exact path="/addInfuzioni" component={AddInfuzioni}/>
          <Route path="/editInfuzioni/:id" component={EditInfuzioni}/>
        </Switch>
      </Router>
    </div>

  );
}

export default App;