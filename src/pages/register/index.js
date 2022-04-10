import { React, useState } from 'react';
import { useRouter } from 'next/router';


const Index = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: ''
    })
    const router = useRouter();
    function handleSubmit(e) {
        e.preventDefault()
        fetch('http://localhost:3003/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("Token", data.accessToken);
                localStorage.setItem("user", JSON.stringify(data.user))
                router.push("/profil");
            })
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className='container_form'>
            <form className='login-form' onSubmit={e => handleSubmit(e)}>
                <h1 className='form_title'>Inscription</h1>
                <input className={"input_form"} type='text' placeholder='Username' value={formData.username} name='username' onChange={e => handleChange(e)} ></input>
                <input className={"input_form"} type='email' placeholder='Email' value={formData.email} name='email' onChange={e => handleChange(e)} ></input>
                <input className={"input_form"} type='password' placeholder='Password' value={formData.password} name='password' onChange={e => handleChange(e)} ></input>
                <button className='btn_color_red btn_form' type='submit'>Sign Up</button>
            </form>

        </div>
    );
}

export default Index;
