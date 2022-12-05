import React, { useEffect, useState } from 'react';
import { Navigate , useNavigate} from 'react-router-dom';
import App from '../App';
import NetworkCheck from '../views/NetworkCheck/NetworkCheck';


const CheckNetworkConnection = () => {

    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const navigate = useNavigate();

    useEffect(() => {
        const checkOnlineStatus = ({ children }) => {
            setIsOnline(navigator.onLine)
        }

        window.addEventListener('online', checkOnlineStatus)
        window.addEventListener('offline', checkOnlineStatus)

        return (
            window.removeEventListener('online',checkOnlineStatus),
            window.removeEventListener('offline',checkOnlineStatus)
        )
    }
        , [])

        if(!isOnline){
            return <NetworkCheck/>

        }
        else{
            
            return <App/>
        }
    
};

export default CheckNetworkConnection;