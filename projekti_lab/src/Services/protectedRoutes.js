import {Redirect, Route, useHistory} from "react-router-dom"
import { checkAdmin, checkInfermier } from "./checkRolet";

const checkForToken = () => {
  const usertoken = (localStorage.getItem("usertoken"));
  if(usertoken !== null){
    return true;
  }
  return false;
}

export const ProtectedRoutes = props => {
  return checkForToken()? <Route {...props}  />: <Redirect to="/"/>
}

