import axios from 'axios';
import requests from "../../request/Tools";
import { React, useEffect, useState } from 'react';
import Cardmovies from '../../components/CardMovies';
import Button from "../../components/Button"
import Carousel from 'react-multi-carousel';
import Banner from '../../components/Banner';
import Row from '../../components/Row';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';


const Mainpage = () => {
    const [movies, setMovies] = useState([])
    const [moviesSearch, setMoviesSearch] = useState([])
    const [movieBanner, setMovieBanner] = useState([])
    const [search, setSearch] = useState()
    const [trailer, setTrailer] = useState()
    const [loading, setLoading] = useState(true)
    const [showModal, SetShowModal] = useState(false);
    const [loadingTrailer, setLoadingTrailer] = useState(true)
    const [trueLoading, setTrueLoading] = useState(true)
    //let list_movies = localStorage.getItem("list_movies");
    const apiUrl = "https://api.themoviedb.org/3/movie/"
    const api_key = "68f3e254905b7d9ded0d2c549eeb73c5"
    const router = useRouter();

    const handleClickModal = () => {
        showModal ? SetShowModal(false) : SetShowModal(true);
    }
    const closeModal = () => { showModal ? SetShowModal(false) : null }
    useEffect(() => {
        const getMovies = async () => {
            let newResult = [];
            const result = await axios.get(requests.fetchTrending);
            let count = result.data.results.length;
            newResult = [...result.data.results];
            while (count % 6 !== 0) {
                let index = Math.floor(Math.random() * count);
                newResult.push(newResult[index]);
                count++;
            }
            setMovies(result.data.results);
            setMovieBanner(result.data.results[Math.floor(Math.random() * result.data.results.length - 1)]);
            setLoading(false)
        }
        const getTrailer = async () => {
            const result = await axios.get(`${apiUrl}/634649/videos?api_key=68f3e254905b7d9ded0d2c549eeb73c5`);
            setTrailer(result.data.results[0].key);
            setLoadingTrailer(false)
        }
        if (loading === true) {
            getMovies();
        }
        if (loadingTrailer === true) {
            getTrailer();
        }
    }, [loading, loadingTrailer]);

    useEffect(() => {
        if (loading === true || loadingTrailer === true) {
            setTrueLoading(true);
        }
        if (loading === false && loadingTrailer === false) {
            setTrueLoading(false);
        }
    }, [loading, loadingTrailer]);

    /*useEffect(() => {
        setSearch(window.location.search.substring(2))
        console.log(search);
        if (search !== "/home") {
            setTimeout(() => {
                axios.get(`https://api.themoviedb.org/3/search/movie?api_key=68f3e254905b7d9ded0d2c549eeb73c5&language=en-US&query=${search}&page=1`)
                    .then((res) => {
                        console.log(res.data.results)
                        setMoviesSearch(res.data.results);
                    })
            }, 2000);
        }
        
    }, [search])
*/

    /*@todo utiliser useCallback et faire une requete http avec la saisie 
        listingSearchAutoComplete sur le git alma pour s'inspirer
    */

    return (
        <>
            {trueLoading === true ? "Loading" : (
                <>
                    <Banner movie={movieBanner} handleClickModal={handleClickModal} showModal={showModal} closeModal={closeModal} />
                    
                        <div className='' onClick={closeModal}>
                            {/*<div className='most_popular'>
                                <iframe width={"100%"} height={"100%"} src={"https://www.youtube.com/embed/" + trailer + "?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0"}></iframe>
                            </div>*/}
                            <Row title={"Tendances actuelles"} url={requests.fetchTrending} />
                            <Row title={"Les mieux notés"} url={requests.fetchTopRated} />
                            <Row title={"films d'action"} url={requests.fetchActionMovies} />
                            <Row title={"Film d'horreur"} url={requests.fetchHorrorMovies} />
                            <Row title={"Film comique"} url={requests.fetchComedyMovies} />
                        </div>
                        <ToastContainer autoClose={8000} />

                    <div className='bg' onClick={closeModal}></div>
                </>
            )}
        </>
    );
}

export default Mainpage;
