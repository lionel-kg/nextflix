import CancelIcon from '@material-ui/icons/CancelOutlined';
import axios from 'axios';
import {React,useEffect,useState} from 'react';
import Button from './Button';
import SimilarCard from "./SimilarMoviesCard"


const Modal = (props) => {
    const { bannerStyle, movie, modal, modalStatut } = props;
    const API_KEY = "7f73b4bd455e5ace6fdc9f0d04e45857";
    const MOVIE_API = "https://api.themoviedb.org/3"
    const [similarMovies, setSimilarMovies] = useState()
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getSimilar = ()=>{
            axios.get(`${MOVIE_API}/movie/${movie.id}/similar?api_key=${API_KEY}&language=fr&page=1`)
            .then((response) => {
                setSimilarMovies(response.data.results);
                console.log(data.results);
            })
            .catch(err => console.log(err))
        }
        if(loading === true){
            getSimilar();
            setLoading(false);
        }
        
    }, []);

    return (
        <div className={`modal ${modalStatut && "open"}`}>
            <div className="modal_banner" style={bannerStyle}>
                <div className="modal_content">
                    <h3 className="modal_title">{movie.title || movie.original_title}</h3>
                    <p>
                        {movie.overview}
                    </p>
                    <h2>titre similaires : </h2>
                    <div className="container_similar">
                        
                        {similarMovies?.map((movie) => { return <SimilarCard movie={movie} /> })}
                    </div>
                </div>
            </div>
            <Button classes={"modal_close"} onclick={modal} text={<CancelIcon fontSize='large' />} />
        </div>
    );
}

export default Modal;
