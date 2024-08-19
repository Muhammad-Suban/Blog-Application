import React from "react";
import  {Logout}  from "../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/authService";

function LogoutBtn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = () => {
      authService.logout().then(() => {
          dispatch(Logout())
          alert("Logout Successfully")
          navigate('/')
      })
  }
return (
  <button
  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
  onClick={logoutHandler}
  >Logout</button>
)
}
export default LogoutBtn;
