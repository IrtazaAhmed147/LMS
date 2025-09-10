import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/common.js";
import { handleLogout } from "../../utils/HelperFunctions";

export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const res = await api.post(
            "/auth/verifyUser",
            {},            
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          );
          console.log(res);
          

          if (!res.data.success) {
            // Token invalid - logout
            handleLogout(dispatch,navigate);
            setIsVerified(false);
          }
        } catch (error) {
          console.log(error);
          
          // Any error (401/403) → logout
          handleLogout(dispatch,navigate);
          setIsVerified(false);
        }
      }
    };

    verifyUser();
  }, [token, dispatch, navigate]);

  if (!user || !isVerified) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles && allowedRoles !== user.role) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
