import { React, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/assets/logo.png';
import Button from './Button';
import Select from './Select';
import Input from './Input';
import axios from 'axios';

const Header = (props) => {

    const [movies, setMovies] = useState([])
    const options = [
        { value: 'français', label: 'Français' },
        { value: 'english', label: 'English' }]

    const searchMovie = (param) => {
        if (param !== "") {
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=68f3e254905b7d9ded0d2c549eeb73c5&language=en-US&query=${param}&page=1`)
                .then((res) => {
                    setMovies(res.data.results);
                    console.log(movies);
                })
        }

        if (param === "") {
            localStorage.removeItem("list_movies");
        } else {
            localStorage.setItem("list_movies", JSON.stringify(movies));
        }
    }
    const handleChange = (e) => {
        console.log(e)
        let searchParams = new URLSearchParams(window.location.search);
        let search = ""
        searchParams.set("q", e);
        console.log(searchParams.toString)
        let set
        if (searchParams.toString !== "") {
            search = "/search"

            if (window.history.replaceState) {
                const url = window.location.origin +search
                    + "?"
                    + searchParams.toString();

                console.log(window.location.pathname, window.location.host)
                window.history.replaceState({
                    path: url
                }, "", url)
            }
        }
    };

    return (
        <div className='header_main'>
            <div className='container'>
                <Image src={logo}
                    alt=""
                    width={300}
                    height={100} />

            </div>

            <nav className='header_nav'>
                <ul className='nav_list'>
                    <li>
                        <Input type={"text"} name={"search"} placeholder={"Titre, genre, personne"} onKeyUp={(e) => handleChange(e.target.value)} onChange={(e) => { searchMovie(e.target.value) }} ></Input>
                    </li>
                    <li className='nav_item'>
                        <Select classes="select" options={options} />
                    </li>
                    <li className='nav_item'>
                        <Link href="/register">
                            <Button text={"s'inscrire"} classes="btn btn_color_red" />
                        </Link>
                    </li>
                </ul>
            </nav>

        </div>
    );
}

export default Header;
