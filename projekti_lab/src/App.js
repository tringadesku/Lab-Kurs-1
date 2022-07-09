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
import { Login } from "./Components/Login";
import { Kontrollat } from "./Components/Kontrollat";
import { AddKontrolla } from "./Components/AddKontrolla";
import { EditKontrolla } from "./Components/EditKontrolla";
import { Faturat } from "./Components/Faturat";
import { AddFatura } from "./Components/AddFatura";
import { EditFatura } from "./Components/EditFatura";
import { Ambulanca } from "./Components/Ambulanca";
import { AddAmbulanca } from "./Components/AddAmbulanca";
import { EditAmbulanca } from "./Components/EditAmbulanca";
import { Praktikantet } from "./Components/Praktikantet";
import { AddPraktikanti } from "./Components/AddPraktikanti";
import { EditPraktikanti } from "./Components/EditPraktikantet";
import { Laboratori } from "./Components/Laboratori";
import { AddLaboratori } from "./Components/AddLaboratori";
import { EditLaboratori } from "./Components/EditLaboratori";
import { Operacionet } from "./Components/Operacionet";
import { AddOperacioni } from "./Components/AddOperacioni";
import { EditOperacioni } from "./Components/EditOperacioni";
import { Terminet } from "./Components/Terminet";
import { AddTermini } from "./Components/AddTermini";
import { EditTermini } from "./Components/EditTermini";
import { TrajtimetMujore } from "./Components/TrajtimetMujore";
import { AddTrajtimiMujor } from "./Components/AddTrajtimiMujor";
import { EditTrajtimiMujor } from "./Components/EditTrajtimiMujor";
import { CovidLab } from "./Components/CovidLab";
import { AddCovidLab } from "./Components/AddCovidLab";
import { EditCovidLab } from "./Components/EditCovidLab";


function App(){
  const usertoken = (localStorage.getItem("usertoken"));

  return(
    <div className="App">
      <Router>
      
        <Switch>
         <Route exact path="/" component={Login}/>
          <div>
          <Nav />
          <Route exact path="/home" component={Home}/>
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
          <Route path="/kontrollat" component={Kontrollat}/>
          <Route exact path="/addKontrolla" component={AddKontrolla}/>
          <Route path="/editKontrolla/:id" component={EditKontrolla}/>
          <Route path="/faturat" component={Faturat}/>
          <Route exact path="/addFatura" component={AddFatura}/>
          <Route path="/editFatura/:id" component={EditFatura}/>
          <Route path="/ambulancat" component={Ambulanca}/>
          <Route exact path="/addAmbulanca" component={AddAmbulanca}/>
          <Route path="/editAmbulanca/:id" component={EditAmbulanca}/>
          <Route path="/praktikantet" component={Praktikantet}/>
          <Route exact path="/addPraktikanti" component={AddPraktikanti}/>
          <Route path="/editPraktikanti/:id" component={EditPraktikanti}/>
          <Route path="/laboratori" component={Laboratori}/>
          <Route exact path="/addLaboratori" component={AddLaboratori}/>
          <Route path="/editLaboratori/:id" component={EditLaboratori}/>
          <Route path="/operacionet" component={Operacionet}/>
          <Route exact path="/addOperacioni" component={AddOperacioni}/>
          <Route path="/editOperacioni/:id" component={EditOperacioni}/>
          <Route path="/terminet" component={Terminet}/>
          <Route exact path="/addTermini" component={AddTermini}/>
          <Route path="/editTermini/:id" component={EditTermini}/>
          <Route path="/trajtimet" component={TrajtimetMujore}/>
          <Route exact path="/addTrajtimi" component={AddTrajtimiMujor}/>
          <Route path="/editTrajtimi/:id" component={EditTrajtimiMujor}/>
          <Route path="/CovidLab" component={CovidLab}/>
          <Route exact path="/addCovidLab" component={AddCovidLab}/>
          <Route path="/editCovidLab/:id" component={EditCovidLab}/>
          </div>
        </Switch>
      </Router>
    </div>

  );
}

export default App;