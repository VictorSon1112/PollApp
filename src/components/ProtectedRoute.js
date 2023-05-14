import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Header from "./Header";

export const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.infoUser);

  if (!user.id) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Header user={user} />
      {children}
    </>
  );
};
