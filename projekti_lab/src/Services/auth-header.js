export default function authHeader(){
  const usertoken = (localStorage.getItem("usertoken"));

  if(usertoken){
    return {
      Authorization : 'bearer ' + usertoken
    };
  }else{
    return {};
  }
}