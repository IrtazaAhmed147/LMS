import { toast } from "react-toastify";
import { userReset } from "../redux/slices/authSlice";

export const notify = (theme, msg) => {
  return toast[theme](msg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",

  });
}

export const handleLogout = async (dispatch, navigate) => {

  try {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    dispatch(userReset())
    navigate('/auth')
    notify('success', 'User logged out successfully')
  } catch (error) {
    console.log(error);
    notify('error', error.message)

  }
}