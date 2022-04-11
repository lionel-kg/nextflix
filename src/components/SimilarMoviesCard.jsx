
import { useEffect, useState } from "react";

const SimilarMoviesCard = (props) => {
  const {movie} = props;
  return (
    <>
      <div className='similar_movie'>
        <img className="similar_movie_img" src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path} alt={movie.path} />
      </div>

    </>
  )
}

export default SimilarMoviesCard