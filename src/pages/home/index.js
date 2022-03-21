import axios from 'axios';
import { React, useEffect, useState } from 'react';
import Cardmovies from '../../components/CardMovies';
import Button from "../../components/Button"

const Mainpage = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const apiUrl = "https://api.themoviedb.org/3/movie/"
    const api_key = "68f3e254905b7d9ded0d2c549eeb73c5"
    //https://api.themoviedb.org/3/movie/popular?api_key=19dedc791dc255982eaf84be8a93012a&language=en-US&page=1
    useEffect(() => {
        const getMovies = async () => {
            const result = await axios.get(`${apiUrl}popular?api_key=${api_key}&language=fr-FR&page=1`);
            setMovies(result.data.results);
            setLoading(true)
        }
        getMovies()
        console.log(movies)
    }, [loading])

    return (
        <>
            <div className='list_movies'>
                {
                    movies.map((movie) => {
                        return <Cardmovies src={`https://image.tmdb.org/t/p/w185/${movie.backdrop_path}`} title={movie.title} />
                       
                    })
                }
                <Button classes={"carrousel_btn previous"} text={"<"} />
                <Button classes={"carrousel_btn next"} text={">"} />
            </div>
            <div className='bg'>

            </div>

        </>
    );
}

export default Mainpage;
