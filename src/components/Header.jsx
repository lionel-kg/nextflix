import { React, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/assets/logo.png';
import avatar from '../public/assets/avatar.png'
import Button from './Button';
import Select from './Select';
import Input from './Input';
import axios from 'axios';
import { useRouter } from 'next/router';
import NotificationIcon from "@material-ui/icons/Notifications"
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search"
import LogoutIcon from '@material-ui/icons/ExitToApp';

const Header = (props) => {
    const { page } = props;
    const prevScrollY = useRef(100);
    const [navBlack, setNavBlack] = useState(false);
    const [isActive, setIsActive] = useState(false)
    const [movies, setMovies] = useState([])
    const router = useRouter();
    const options = [
        { value: 'français', label: 'Français' },
        { value: 'english', label: 'English' }]

    const searchMovie = (param) => {
        if (param !== "") {
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=68f3e254905b7d9ded0d2c549eeb73c5&language=en-US&query=${param}&page=1`)
                .then((res) => {
                    setMovies(res.data.results);
                    //console.log(movies);
                })
        }
        if (param === "") {
            localStorage.removeItem("list_movies");
        } else {
            localStorage.setItem("list_movies", JSON.stringify(movies));
        }
    }



    const handleChange = (e) => {
        let searchParams = new URLSearchParams(window.location.search);
        let search = ""
        searchParams.set("q", e);
        //console.log(searchParams.toString)
        if (e !== "") {
            search = "/search"

            if (window.history.replaceState) {
                const url = window.location.origin + search
                    + "?"
                    + searchParams.toString();

                window.history.replaceState({
                    path: url
                }, "", url)
            }
            setTimeout(() => {
                router.push(url);
            }, 2000);
        } else {
            search = "/home"
            if (window.history.replaceState) {
                const url = window.location.origin + search
                window.history.replaceState({
                    path: url
                }, "", url)
            }
        }
    };

    const transitionNav = () => {
        window.screenY > 100 ? setNavBlack(true) : setNavBlack(false);
    }

    const showSearch = () => {
        if (isActive === false) {
            setIsActive(true)
            console.log(isActive)
        }
    }
    const hiddenSearch = () => {
        if (isActive === true) {
            setIsActive(false);
            console.log(isActive)
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (prevScrollY.current > 100 && !navBlack) {
                setNavBlack(true);
            }
            if (prevScrollY.current < 100 && navBlack) {
                setNavBlack(false);
            }
            prevScrollY.current = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, [navBlack]);


    return (
        <>
            {router.asPath === "/" || router.asPath === "/login" || router.asPath === "/register" ?

                (<div className='header_main'>
                    <div className='container'>
                        <Image src={logo}
                            alt=""
                            width={150}
                            height={100} />

                    </div>

                    <nav className='header_nav'>
                        <ul className='nav_list'>
                            <li>
                                <Input classes={"search_bar"} type={"text"} name={"search"} placeholder={"Titre, genre, personne"} onKeyUp={(e) => handleChange(e.target.value)} onChange={(e) => { searchMovie(e.target.value) }} ></Input>
                            </li>
                            <li className='nav_item'>
                                <Select classes="select select_header" options={options} />
                            </li>
                            <li className='nav_item'>
                                {router.asPath === "/login" ?
                                    (<Link href={"/register"}>
                                        <Button text={"S'inscrire"} onclick={() => { router.push("/register") }} classes="btn btn_color_red" />
                                    </Link>) : (<Link href={"/login"}>
                                        <Button text={"Connexion"} onclick={() => { router.push("/login") }} classes="btn btn_color_red" />
                                    </Link>)}
                            </li>
                        </ul>
                    </nav>

                </div>) : (

                    <div className={`nav ${navBlack && "nav_black"}`}>
                        <Button classes={"nav_burger"} text={<MenuIcon />} />
                        <div className='container'>
                            <Image src={logo}
                                alt=""
                                width={150}
                                height={100} />

                        </div>
                        <ul className='nav_links'>
                            <li className="nav_link"><Link href={"/home"} className="nav_link">
                                Accueil
                            </Link></li>
                            <li className="nav_link"><Link href={"/filter"}  >
                                Film
                            </Link></li>
                            <li className="nav_action"> <Link href={"/wishlist"} >
                                Ma liste
                            </Link></li>
                        </ul>
                        <ul className="nav_actions ">
                            <li className="nav_action">{/*<Input classes={`${isActive && "active"}`} onKeyUp={(e) => handleChange(e.target.value)} onChange={(e) => { searchMovie(e.target.value) }} />*/}<Link href={"/filter"}>

                                <div ><SearchIcon onClick={showSearch} /></div>
                            </Link></li>

                            <li className="nav_action"> <Link href={"/home"} className="nav_action">
                                Jeunesse
                            </Link></li>
                            <li className="nav_action"><Link href={"/home"} className="nav_action">
                                <NotificationIcon />
                            </Link></li>
                            <li className="nav_action"><Link href={"/profil"} className="nav_action">
                                <Image src={avatar}
                                    alt=""
                                    width={30}
                                    height={30} />
                            </Link></li>
                            <li className="nav_action"><Link href={"/login"} className="nav_action">
                                <LogoutIcon onClick={() => {
                                    localStorage.removeItem("Token")
                                    localStorage.removeItem("user")
                                }} />
                            </Link></li>
                        </ul>
                    </div>)
            }
        </>
    );
}

export default Header;
