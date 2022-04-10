import { React, useEffect, useState } from 'react';
import PlayIcon from "@material-ui/icons/PlayArrowRounded";
import AddIcon from "@material-ui/icons/AddCircleOutlineRounded";
import SuppIcon from "@material-ui/icons/CloseRounded";
import ThumbUpIcon from '@material-ui/icons/ThumbUpRounded';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Cardmovies = (props) => {
    const { movie } = props;
    const [isHover, setIsHover] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const notifyAdd = () => toast.success(`${movie.original_title} a bien été ajouté dans ta watchlist !`,{position: toast.POSITION.TOP_CENTER});
    const [wish, setWish] = useState()
    const mouseOnCard = () => {
        if (isHover === false) {
            setTimeout(() => {
                setIsHover(true);
            }, 300);
        }
    }


    const mouseOutsideCard = () => {
        if (isHover === true) {
            setTimeout(() => {
                setIsHover(false);
            }, 300);
        }
    }
    


    const addWishlist = (el) =>{
        //setIsValid(true)
        let newMovie = {
            title : el.title,
            backdrop_path : el.backdrop_path,
            overview : el.overview,      
          };
      
          const wishList = [];
      
          //si j'ai déjà un ou des produit dans le localstorage
          if (localStorage.getItem('wishList')) {
            const localStorageCart = JSON.parse(localStorage.getItem('wishList'));
            localStorageCart.forEach(movie => {
                wishList.push(movie);
            });
            const indice = wishList.findIndex((element) => element.id === el.id)
            //si le produit est déjà dans le panier
            if (indice !== -1){
              newMovie = wishList[indice];
            }
            else{
              wishList.push(newMovie);
            }
            localStorage.setItem('wishList', JSON.stringify(wishList));
          }
          //si localstorage vide
          else {
            wishList.push(newMovie);
            localStorage.setItem('wishList', JSON.stringify(wishList));
          }
    }
    return (
        <>
            <div className='card_movies' id={movie.title} onMouseOver={mouseOnCard} onMouseOut={mouseOutsideCard}>
                <img src={`https://image.tmdb.org/t/p/w185/${movie.backdrop_path}`} />
                <div className='itemInfo'>
                    <div className='icons'>
                        <PlayIcon /> 
                        <AddIcon onClick={() => {
                        addWishlist(movie)  
                        notifyAdd()}} />
                        <ThumbUpIcon /><SuppIcon /></div>
                    <div className='title_movies'>{movie.title}</div>
                </div>
            </div>
        </>

    );
}

export default Cardmovies;
