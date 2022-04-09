import { React, useEffect, useRef, useState } from 'react';
import Cardmovies from './CardMovies';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import { Directions } from '@material-ui/icons';


const Row = (props) => {
    const [isMoved, setIsMoved] = useState(false);
    const [sliderNumber, setSliderNumber] = useState(0)
    const { title, url } = props;
    const [movies, setMovies] = useState([])
    const ref = useRef();
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
        const getMovies = async () => {
            let newResult = [];
            const result = await axios.get(url);
            let count = result.data.results.length;
            newResult = [...result.data.results];
            while (count % 6 !== 0) {
                let index = Math.floor(Math.random() * count);
                newResult.push(newResult[index]);
                count++;
            }
            setMovies(result.data.results);
            setLoading(false)
        }
        if (loading === true) {
            getMovies()
        }
    }, [loading]);
    const handleclick = (Directions) => {
        setIsMoved(true)
        let distance = ref.current?.getBoundingClientRect().x - 50;
        if (Directions === "left" && sliderNumber > 0) {
            setSliderNumber(sliderNumber - 1)
            console.log(ref.current?.style)
            ref.current?.style.transform = `translate(${230 + distance}px)`
        }
        if (Directions === "right" && sliderNumber < 10) {
            setSliderNumber(sliderNumber + 1)
            console.log(ref.current?.style)
            ref.current?.style.transform = `translate(${-230 + distance}px)`
        }
    }

    return (
        <div className='row'>
            <h2 className='row_title'>
                {title}
            </h2>
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
                            return <div className='list_movies'><Cardmovies movie={movie} /></div>
                        })
                    }
                </Carousel>
        </div>
    );
}

export default Row;
