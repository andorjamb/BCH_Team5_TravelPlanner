import { Navigate } from 'react-router-dom';
import { UserAuth } from '../components/Context/Context';



const SecureAccess = ({ children }) => {
  const { user } = UserAuth();
  if (!user) {
    return <Navigate to='/' />;//Exploreview is the default landing page
  }else{
    //user is signed in show the route of the children enclosed in SecureAccess

    return children;
  }

};

export default SecureAccess;


