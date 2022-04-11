import axios from 'axios';
import { React, useEffect, useState } from 'react';
import Banner from '../../components/Banner';
import Cardmovies from '../../components/CardMovies';
import Row from '../../components/Row';
import requests from '../../request/Tools';
import Withauth from '../../HDC/withAuth';

/*
const Index = () => {
    const [movies, setMovies] = useState([]);
    const [movieBanner, setMovieBanner] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        
        const getfiltermovies = async (genre = "rated") => {
            let request = requests.fetchTopRated;
            if (genre === "action") {
                request = requests.fetchActionMovies;
            } else if (genre === "comedie") {
                request = requests.fetchComedyMovies;
            } else if (genre === "horreur") {
                request = requests.fetchHorrorMovies;
            } else if (genre === "romance") {
                request = requests.fetchRomanceMovies;
            }
            const result = await axios.get(request);
            setMovies(result.data.results)
            setMovieBanner(result.data.results[Math.floor(Math.random() * result.data.results.length - 1)]);

            setLoading(false)
        }
        if (loading === true) {
            getfiltermovies()
        }
        console.log(movies);
    }, [loading])


    return (
        <>
            {loading === false ? (
                <>< Banner movie={movieBanner} />
                    <div className='list_movies_filter'>
                        {
                            movies.map((movie) => {
                                return <><Cardmovies movie={movie} /></>
                            })
                        }
                        <div className='bg'></div>
                    </div></>) : (null)}




        </>
    );
}*/

export default Withauth(Index);
