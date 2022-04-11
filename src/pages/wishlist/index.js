import {React,useEffect,useState} from 'react';

const Index = () => {
    const [myList, setMyList] = useState(typeof window !== "undefined" ? JSON.parse(localStorage.getItem("wishList")) : []);
    useEffect(() => {
        setMyList(JSON.parse(localStorage.getItem("wishList")));
      }, []);

    return (
        <div className="wishList">
          <h2>Ma liste</h2>
          {myList ? (
            <div className='list_movies_filter'>
            {
                myList.map((movie) => {
                    return <>
                        <div className="list_filter">
                                <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} />
                                <div className='info'>
                                    {movie.title}
                                </div>
                        </div>

                    </>
                })
            }
        </div>
          ) : (
            <center>
              <p className="text__center">Votre watchlist est vide.</p>
            </center>
          )}
        </div>
      );
}

export default Index;
