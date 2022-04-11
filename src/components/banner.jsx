import { React, useState, useEffect } from 'react';
import Button from './Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Modal from './Modal';
import axios from 'axios';
import YouTube from 'react-youtube';
import Select from './Select';
import { useRouter } from 'next/router';



const Banner = (props) => {
    const { movie, handleClickModal, showModal, closeModal } = props;
    const router = useRouter();
    const API_KEY = "7f73b4bd455e5ace6fdc9f0d04e45857";
    const MOVIE_API = "https://api.themoviedb.org/3/"
    const [trailer, setTrailer] = useState(null);
    const [playing, setPlaying] = useState(false)
    const bannerStyle = {
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
    }

    const truncateDescription = (desc, number) => {
        return desc?.length > number ? (desc.substr(0, number - 1) + "...") : null
    }

    useEffect(() => {
        fetchMovie(movie.id)
    }, [playing]);

    const fetchMovie = async (id) => {
        const { data } = await axios.get(`${MOVIE_API}movie/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "videos"
            }
        })

        if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
            setTrailer(trailer ? trailer : data.videos.results[0])
        }

    }



    return (
        <header className="banner" style={bannerStyle} onClick={closeModal}>
            <div className="banner_content">
                <h1 className="banner_title">{movie?.title || movie?.original_title}</h1>
                <p className="banner_description">
                    {truncateDescription(movie.overview, 200)}
                </p>
                <div className="banner__buttons">
                    {playing ?
                        <>
                            <YouTube
                                videoId={trailer?.key}
                                className={"youtube amru"}
                                containerClassName={"youtube-container amru"}
                                opts={
                                    {
                                        width: '100%',
                                        height: '100%',
                                        playerVars: {
                                            autoplay: 1,
                                            controls: 0,
                                            cc_load_policy: 0,
                                            fs: 0,
                                            iv_load_policy: 0,
                                            modestbranding: 0,
                                            rel: 0,
                                            showinfo: 0,
                                        },
                                    }
                                }
                            />
                            <button onClick={() => setPlaying(false)} className={"button btn btn__color-red close-video"}>Close
                            </button>
                        </> : <div className="banner_buttons">
                            <Button classes="banner_btn banner_btn_play" text="Lecture" icon={<PlayArrowIcon />} onclick={() => setPlaying(true)} />
                            <Button 
                                classes="banner_btn" 
                                text="Plus d'infos"
                                icon={<InfoIcon />} 
                                onclick={() => {
                                handleClickModal()
                            }} />
                            {router.asPath === "/filter" ?

                                <Select options={options} classes={"select"}/> : null
                            }
                        </div>
                    }
                </div>
            </div>
            <Modal bannerStyle={bannerStyle} movie={movie} modal={handleClickModal} modalStatut={showModal} />
        </header>
    );
}

export default Banner;
