import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { State } from "./state/reducers"

interface Props {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: Props) => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state: State) => state.authStatus)
  

  const location = useLocation();

  if (authStatus == false) {
    return <Navigate replace to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;