import axios from 'axios';
import { React, useEffect, useState } from 'react';
import Cardmovies from '../../components/CardMovies';
import Button from "../../components/Button"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Mainpage = () => {
    const [movies, setMovies] = useState([])
    const [search, setSearch] = useState(false)
    const [trailer, setTrailer] = useState()
    const [loading, setLoading] = useState(true)
    const [loadingTrailer, setLoadingTrailer] = useState(true)
    const [trueLoading, setTrueLoading] = useState(true)
    //let list_movies = localStorage.getItem("list_movies");

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 4,
            slidesToSlide: 4,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6,
            slidesToSlide: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 6,
            slidesToSlide: 6,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
            slidesToSlide: 2,
        }
    };
    const apiUrl = "https://api.themoviedb.org/3/movie/"
    const api_key = "68f3e254905b7d9ded0d2c549eeb73c5"
    //https://api.themoviedb.org/3/movie/popular?api_key=19dedc791dc255982eaf84be8a93012a&language=en-US&page=1
    useEffect(() => {
        const getMovies = async () => {
            let newResult = [];
            const result = await axios.get(`${apiUrl}popular?api_key=${api_key}&language=fr-FR&page=1`);
            let count = result.data.results.length;
            newResult = [...result.data.results];
            while (count % 6 !== 0) {
                let index = Math.floor(Math.random() * count);
                newResult.push(newResult[index]);
                count++;
            }
            setMovies(result.data.results);
            //setMovies(newResult);
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

   /* useEffect(() => {
       
        if (list_movies === "") {
            setSearch(true);
        } else {
            setSearch(false);
        }
        console.log(search)
    },[])
*/ 

    /*@todo utiliser useCallback et faire une requete http avec la saisie 
        listingSearchAutoComplete sur le git alma pour s'inspirer
    */

    return (
        <>
            {trueLoading === true ? "Loading" : (
                <>
                    {search === true ?
                        (<div className=''>
                            ( <div className='most_popular'>
                                <iframe width={"100%"} height={"100%"} src={"https://www.youtube.com/embed/" + trailer + "?autoplay=1&mute=1&loop=1&controls=0"}></iframe>
                            </div>
                            {console.log(localStorage.getItem("list_movies") === null)}
                            <Carousel
                                swipeable={false}
                                draggable={false}
                                showDots={false}
                                responsive={responsive}
                                ssr={true} // means to render carousel on server-side.
                                infinite={true}
                                autoPlay={false}
                                shouldResetAutoplay={false}
                                keyBoardControl={true}
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                                itemClass="list_movies carousel-item-padding-5-px">
                                {
                                    movies.map((movie) => {
                                        return <div className='list_movies'><Cardmovies src={`https://image.tmdb.org/t/p/w185/${movie.backdrop_path}`} title={movie.title} /></div>

                                    })
                                }
                            </Carousel>
                        </div>):(null)}
                    <div className='bg'></div>
                </>
            )}
        </>
    );
}

export default Mainpage;
