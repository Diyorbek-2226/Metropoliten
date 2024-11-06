
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element:, userRole, allowedRole, ...rest }) => {
  return userRole === allowedRole ? <Element {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
