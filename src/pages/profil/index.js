import { React, useEffect, useState } from 'react';
import Button from '../../components/Button';
import Withauth from '../../HDC/withAuth';
import Image from 'next/image';
import avatar from '../../public/assets/avatar.png'
import { useRouter } from 'next/router';


const Index = () => {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter();
    useEffect(() => {
        if (loading === true) {
            setUser(JSON.parse(localStorage.getItem("user")));
            setLoading(false)
        }
        console.log(user);
    }, [loading, user])
    const logout = () => {
        localStorage.removeItem("Token")
        localStorage.removeItem("user")
        router.push("/login")
    }

    return (
        <div className='profil'>
            <div className="card">
                <Image src={avatar}
                    alt=""
                    width={50}
                    height={50}
                    className={"img_left"}
                />
                <div className='info'>
                    <h1 className='title'> pseudo : <span >{user.username}</span></h1>
                    <h1 className='title'> email : <span >{user.email}</span></h1>
                    <p><Button text={"logout"} classes={"btn_color_red btn_logout"} onclick={() => logout()} /></p>
                </div>

            </div>
        </div>

    );
}

export default Withauth(Index);
