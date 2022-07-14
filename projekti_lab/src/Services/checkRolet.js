export function checkRecepsionist(){
  const roli = (localStorage.getItem("user_role"));
  if (roli === "Recepsionist"){
    return true;
  }
}

export function checkInfermier(){
  const roli = (localStorage.getItem("user_role"));
  if (roli ==="Infermier"){
    return true;
  }
}

export function checkMjek(){
  const roli = (localStorage.getItem("user_role"));
  if (roli === "Mjek"){
    return true;
  }
}

export function checkLaborant(){
  const roli = (localStorage.getItem("user_role"));
  if (roli === "Laborant"){
    return true;
  }
}

export function checkAdmin(){
  const roli = (localStorage.getItem("user_role"));
  if (roli === "Admin"){
    return true;
  }
}