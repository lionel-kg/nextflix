import {React} from 'react';
import Button from './Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InfoIcon from '@material-ui/icons/InfoOutlined';


const Banner = (props) => {
    const {movie} = props;
    const bannerStyle = {
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition:"center center",
    }
    const truncateDescription = (desc,number) =>{
        return desc?.length > number ? (desc.substr(0, number-1) +"...") : null
    }

    return (
        <header className="banner" style={bannerStyle}> 
            <div className="banner_content">
                <h1 className="banner_title">{movie.title || movie.original_title}</h1>
                    <p className="banner_description">
                        {truncateDescription(movie.overview,200)}
                    </p>
                    <div className="banner_buttons">
                        <Button classes="banner_btn banner_btn_play" text="Lecture" icon={<PlayArrowIcon/>} />
                        <Button classes="banner_btn" text="Plus d'infos" icon={<InfoIcon/>} />
                    </div>
               
            </div>
        </header>
    );
}

export default Banner;
