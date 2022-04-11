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
import Withauth from '../../HDC/withAuth';



const Mainpage = () => {
    const [movies, setMovies] = useState([])
    const [moviesSearch, setMoviesSearch] = useState([])
    const [movieBanner, setMovieBanner] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, SetShowModal] = useState(false);
    const [trueLoading, setTrueLoading] = useState(true)
   
    const router = useRouter();

    const handleClickModal = () => {
        showModal ? SetShowModal(false) : SetShowModal(true);
    }
    const closeModal = () => { showModal ? SetShowModal(false) : null }
    useEffect(() => {
        const getMovies = async () => {
            const result = await axios.get(requests.fetchTrending);
            setMovies(result.data.results);
            setMovieBanner(result.data.results[Math.floor(Math.random() * result.data.results.length - 1)]);
            setLoading(false)
        }
        if (loading === true) {
            getMovies();
        }

    }, [loading]);

    useEffect(() => {
        if (loading === true ) {
            setTrueLoading(true);
        }
        if (loading === false) {
            setTrueLoading(false);
        }
    }, [loading]);

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
    return (
        <>
            {trueLoading === true ? "Loading" : (
                <>
                    <Banner movie={movieBanner} handleClickModal={handleClickModal} showModal={showModal} closeModal={closeModal} />
                    
                        <div className='' onClick={closeModal}>
                            <Row title={"Tendances actuelles"} url={requests.fetchTrending} isWish={false}/>
                            <Row title={"Les mieux notés"} url={requests.fetchTopRated} isWish={false}/>
                            <Row title={"Films d'action"} url={requests.fetchActionMovies} isWish={false}/>
                            <Row title={"Film d'horreur"} url={requests.fetchHorrorMovies} isWish={false}/>
                            <Row title={"Film comique"} url={requests.fetchComedyMovies} isWish={false}/>
                            <Row isWish={true}/>
                        </div>
                        <ToastContainer autoClose={8000} />

                    <div className='bg' onClick={closeModal}></div>
                </>
            )}
        </>
    );
}

export default Withauth(Mainpage);
