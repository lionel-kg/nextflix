import { React, useState } from 'react';
import { useRouter } from "next/router"

const Index = () => {
    const [formData, setFormData] = useState({
        email: '', // required
        password: '' // required
    })
    const router = useRouter();

    function handleSubmit(e) {
        e.preventDefault()
        fetch('http://localhost:3003/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                if (data === "Incorrect password" || data === "Password is too short") {
                    console.log(data)
                } else {
                    localStorage.setItem("Token", data.accessToken);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    router.push("/profil")
                }

            }).catch((e) => {
                console.log(e)
            })
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <h1>Login Form</h1>
            <form className='login-form' onSubmit={e => handleSubmit(e)}>
                <input type='text' placeholder='Email' value={formData.email} name='email' onChange={e => handleChange(e)} ></input>
                <input type='text' placeholder='Password' value={formData.password} name='password' onChange={e => handleChange(e)} ></input>
                <button className='btn_color_red' type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Index;
