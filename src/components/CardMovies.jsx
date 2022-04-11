import { React, useEffect, useState } from 'react';
import PlayIcon from "@material-ui/icons/PlayArrowRounded";
import AddIcon from "@material-ui/icons/AddCircleOutlineRounded";
import SuppIcon from "@material-ui/icons/CloseRounded";
import ThumbUpIcon from '@material-ui/icons/ThumbUpRounded';
import removeIcon from "@material-ui/icons/RemoveCircleOutline"
import Modal from './Modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RemoveCircle } from '@material-ui/icons';



const Cardmovies = (props) => {
    const { movie } = props;
    const [updateWish, setUpdateWish] = useState(false)
    const [isHover, setIsHover] = useState(false)
    const [showModal, SetShowModal] = useState(false);
    const [watchlist, setWatchlist] = useState(typeof window !== "undefined" ? JSON.parse(localStorage.getItem("wishList")) : []);
    const notifyDelete = () => toast.success(`${movie?.title || movie?.name || movie?.original_title} a bien été retiré de ta watchlist !`);

    const notifyAdd = () => toast.success(`${movie.original_title} a bien été ajouté dans ta watchlist !`, { position: toast.POSITION.TOP_CENTER });
    const API_KEY = "7f73b4bd455e5ace6fdc9f0d04e45857";
    const MOVIE_API = "https://api.themoviedb.org/3/"
    const [trailer, setTrailer] = useState(null);
    const [playing, setPlaying] = useState(false);
    const bannerStyle = {
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
    }

    const handleClickModal = () => {
        showModal ? SetShowModal(false) : SetShowModal(true);
    }

    const mouseOnCard = () => {
        if (isHover === false) {
            setTimeout(() => {
                setIsHover(true);
            }, 300);
        }
    }

    /*const fetchMovie = async (id) => {
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

    }*/

    const mouseOutsideCard = () => {
        if (isHover === true) {
            setTimeout(() => {
                setIsHover(false);
            }, 300);
        }
    }

    /*const addWishlist = (el) => {
        let newMovie = {
            title: el.title,
            backdrop_path: el.backdrop_path,
            overview: el.overview,
        };

        const wishList = [];

        //si j'ai déjà un ou des produit dans le localstorage
        if (localStorage.getItem('wishList')) {
            const localStorageList = JSON.parse(localStorage.getItem('wishList'));
            localStorageList.forEach(movie => {
                wishList.push(movie);
            });
            const indice = wishList.findIndex((element) => element.id === el.id)
            //si le produit est déjà dans le panier
            if (indice !== -1) {
                newMovie = wishList[indice];
            }
            else {
                wishList.push(newMovie);
            }
            localStorage.setItem('wishList', JSON.stringify(wishList));
        }
        //si localstorage vide
        else {
            wishList.push(newMovie);
            localStorage.setItem('wishList', JSON.stringify(wishList));
        }
    }*/

    const addWishlist = (element) => {
        //On créé un nouvel object avec une nouvelle propriété quantity
        let newMovie = {
          id: element.id,
          title: element.title,
          backdrop_path: element.backdrop_path,
          poster_path: element.poster_path,
          overview: element.overview,
          quantity: 1
        };
    
    
    
    
        const newListArray = [];
    
        //Si j'ai déjà un ou des produits dans mon localstorage
        if (localStorage.getItem("wishList")) {
    
          const localStorageMyList = JSON.parse(localStorage.getItem("wishList"));
          localStorageMyList.forEach((movie) => {
            newListArray.push(movie);
          });
    
          const indexOfExistingMovie = newListArray.findIndex((el) => el.id === element.id);
    
          if (indexOfExistingMovie !== -1) {
          }
          else {
            newListArray.push(newMovie);
          }
          localStorage.setItem("wishList", JSON.stringify(newListArray));
        }
        //Si localstorage vide
        else {
          newListArray.push(newMovie);
          localStorage.setItem("wishList", JSON.stringify(newListArray));
        }
        setWatchlist(newListArray)
        localStorage.setItem("isUpdate",true);
    
    
      };
   /* const removeToWishList = (el) =>{
        const wishList = [...list];
        wishList.forEach(element => {
        if (el.id === element.id) {
        const index = wishList.indexOf(element)
        wishList.splice(index, 1)
        setList(wishList);
        localStorage.setItem('product', JSON.stringify(wishList))
      } 
        });
    }*/
    const removeToWishList = (movie) => {
        notifyDelete();
        const newList = watchlist.filter((item) => item.id !== movie.id);
        localStorage.setItem("wishList", JSON.stringify(newList));
        setWatchlist(newList);
        setUpdateWish(true);
        localStorage.setItem("isUpdate",true);
      };

    return (
        <>
            <div className='card_movies' id={movie.title} onMouseOver={mouseOnCard} onMouseOut={mouseOutsideCard} onClick={handleClickModal}>
                <img src={`https://image.tmdb.org/t/p/w185/${movie.backdrop_path}`} />
                <div className='itemInfo'>
                    <div className='icons'>
                        <div className="startIcon"><PlayIcon className={"icon_button"}/>
                            <AddIcon onClick={() => {
                                addWishlist(movie)
                                notifyAdd()
                            }} className={"icon_button"}/>
                            <RemoveCircle className={"icon_button"} onClick={() => {removeToWishList(movie)}}/>
                        </div>
                    </div>
                    <div className='title_movies'>{movie.title}</div>
                </div>

            </div>
        </>

    );
}

export default Cardmovies;
