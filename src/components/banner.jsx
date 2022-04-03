import {React, useState} from 'react';
import Button from './Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Modal from './Modal';

const Banner = (props) => {
    const {movie} = props;
    const [showModal , SetShowModal] = useState(false);
    const bannerStyle = {
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition:"center center",
    }
    const truncateDescription = (desc,number) =>{
        return desc?.length > number ? (desc.substr(0, number-1) +"...") : null
    }
    
    const handleClickModal = () =>{
        showModal? SetShowModal(false) : SetShowModal(true);
    }
    console.log(showModal);

    
    return (
        <header className="banner" style={bannerStyle}> 
            <div className="banner_content">
                <h1 className="banner_title">{movie.title || movie.original_title}</h1>
                    <p className="banner_description">
                        {truncateDescription(movie.overview,200)}
                    </p>
                    <div className="banner_buttons">
                        <Button classes="banner_btn banner_btn_play" text="Lecture" icon={<PlayArrowIcon/>} />
                        <Button classes="banner_btn" text="Plus d'infos" icon={<InfoIcon/>} onclick={handleClickModal}/>
                    </div>
                
            </div>
            <Modal bannerStyle={bannerStyle} movie={movie}h modal={handleClickModal} modalStatut={showModal}/>
        </header>
    );
}

export default Banner;
