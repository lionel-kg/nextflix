import axios from 'axios';
import { React, useEffect, useState } from 'react';
import Banner from '../../components/Banner';
import Select from "../../components/Select";
import Input from "../../components/Input";
import Withauth from '../../HDC/withAuth';
import Cardmovies from '../../components/CardMovies';
import Row from '../../components/Row';
import requests from '../../request/Tools';

const Index = () => {
    const [movies, setMovies] = useState([]);
    const [movieBanner, setMovieBanner] = useState([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)
    const options = [
        { value: 'action', label: 'Action' },
        { value: 'comedie', label: 'Comedie' },
        { value: 'horreur', label: 'Horreur' },
        { value: 'romance', label: 'Romance' }
    ];
    const handleChange = (e) => {
        getfiltermovies(e.target.value)
    }
    const onChange = (param) => {
        setSearch(param);
        if (param !== "") {
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=68f3e254905b7d9ded0d2c549eeb73c5&language=en-US&query=${param}&page=1`)
                .then((res) => {
                    setMovies(res.data.results);
                })
        } else {

            getfiltermovies();
        }

    }
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
    useEffect(() => {
        getfiltermovies();
    }, [loading])


    return (
        <div className='home'>
            {loading === false ? (
                <>
                    <div className='container_banner_filter'><Select options={options} classes={"select"} onchange={(e) => handleChange(e)} /><Input classes={"search"} onChange={(e) => onChange(e.target.value)} /></div>
                    <div className='list_movies_filter'>
                        {
                            movies.map((movie) => {
                                return <>
                                    <div className="list_filter">
                                            <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} />
                                            <div className='info'>
                                                {movie.title}
                                            </div>
                                    </div>

                                </>
                            })
                        }
                    </div>
                </>) : (null)}
        </div>
    );
}

export default Withauth(Index);
