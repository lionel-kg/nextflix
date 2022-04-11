import { React, useState } from 'react';
import { useRouter } from "next/router"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Index = () => {
    const [formData, setFormData] = useState({
        email: '', // required
        password: '' // required
    })
    const router = useRouter();
    const notifyAdd = (error) =>  toast.error(error,{position: toast.POSITION.TOP_CENTER});
    const handleSubmit = (e) => {
        axios.post('http://localhost:3003/login', {
            email: formData.email,
            password: formData.password,
        })
        .then(response => {
                localStorage.setItem("Token", response.data.accessToken);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                router.push("/profil")
        })
        .catch((error) => {
           
            notifyAdd(error.response.data)
        })
        e.preventDefault()
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className='container_form'>
            <form className='login-form' onSubmit={e => handleSubmit(e)}>
                <h1 className='form_title'>Connexion</h1>
                <input className={"input_form"} type='email' placeholder='Email' value={formData.email} name='email' onChange={e => handleChange(e)} ></input>
                <input className={"input_form"} type='password' placeholder='Password' value={formData.password} name='password' onChange={e => handleChange(e)} ></input>
                <button className='btn_color_red btn_form' type='submit'>Login</button>
                <ToastContainer autoClose={8000} />
            </form>
        </div>
    )
}

export default Index;
