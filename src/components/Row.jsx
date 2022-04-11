import { React, useEffect, useRef, useState } from 'react';
import Cardmovies from './CardMovies';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';


const Row = (props) => {
    const { title, url, isWish } = props;
    const [movies, setMovies] = useState([])
    const [myList, setMyList] = useState([]);
    const [loading, setLoading] = useState(true)
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
    useEffect(() => {
        setMyList(JSON.parse(localStorage.getItem("wishList")));
    }, []);
    useEffect(() => {
        const getMovies = async () => {
            if (isWish === false) {
                const result = await axios.get(url);
                setMovies(result.data.results);
                setLoading(false)
            } 
        }

        if (loading === true) {
            getMovies()
        }
    }, [loading]);

    return (
        <div className='row'>
            <>
                <h2 className='row_title'>
                    {title}
                </h2>
                <Carousel
                    swipeable={false}
                    draggable={false}
                    showDots={false}
                    responsive={responsive}
                    ssr={true}
                    infinite={true}
                    autoPlay={false}
                    shouldResetAutoplay={false}
                    keyBoardControl={true}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    itemClass="list_movies carousel-item-padding-5-px">
                    {
                        movies.map((movie) => {
                            return <Cardmovies movie={movie} />
                        })
                    }
                </Carousel>
            </>
            {isWish === true && myList !== null && myList !== []  ?
                <>
                    <h2 className='row_title' id={"ma-liste"}>
                        Ma liste
                    </h2>
                    <Carousel
                        swipeable={false}
                        draggable={false}
                        showDots={false}
                        responsive={responsive}
                        ssr={true}
                        infinite={true}
                        autoPlay={false}
                        shouldResetAutoplay={false}
                        keyBoardControl={true}
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        itemClass="list_movies carousel-item-padding-5-px">
                        {
                            myList.map((movie) => {
                                return <Cardmovies movie={movie} />
                            })
                        }
                    </Carousel>
                </> : null}
        </div>
    );
}

export default Row;
