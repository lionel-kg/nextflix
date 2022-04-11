import { useRouter } from 'next/router';
import {React,useEffect,useState} from 'react';

const Withauth = (WrapperComponent) => {

    return (props) => {
        const Router = useRouter();
        const [authVerified, setAuthVerified] = useState(false)

        useEffect(() => {
            const token = localStorage.getItem("Token");
            if (!token) {
                Router.push("/login")
            } else {
                setAuthVerified(true)
            }
        }, [Router]);
        if(authVerified){
            return <WrapperComponent {...props}/>
        } else {
            return null;
        }
    } 
    
}

export default Withauth;
