import { React, useEffect, useState } from 'react';

const Cardmovies = (props) => {
    const { src, title } = props;
    const [isHover, setIsHover] = useState(false)
    const mouseOnCard = () => {
        setIsHover(true)
    }
    useEffect(() => {
        console.log(isHover)
    }, [isHover])



    return (
        <>
            {isHover == false ?
                (
                    <>
                        <div className='card_movies'>
                            <img src={src} onMouseOver={mouseOnCard} />
                        </div>
                        <div className='mouseout'>

                        </div>
                    </>
                )
                :
                (
                    <div className='card_movies'>
                        <img src={src} />
                        <div className='list_button'></div>
                        <div className='title_movies'>{title}</div>
                    </div>
                )
            }
        </>

    );
}

export default Cardmovies;
