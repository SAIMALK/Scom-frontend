import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  return <Outlet /> 
};
export default PrivateRoute;