import {React,useEffect,useState} from 'react';
import Withauth from '../../HDC/withAuth';


const Index = () => {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if(loading === true){
            setUser(JSON.parse(localStorage.getItem("user")));
            setLoading(false)
        }
        console.log(user);
    }, [loading])
    
    return (
        <div className='container'>
            <div style={{color:"white"}}>
                {user.username}
            </div>
        </div>
    ); 
}

export default Withauth(Index);
