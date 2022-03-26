import { React, useEffect, useState } from 'react';

const Cardmovies = (props) => {
    const { src, title } = props;
    const [isHover, setIsHover] = useState(false)
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
    
    useEffect(() => {
        console.log(isHover)
    }, [isHover])



    return (
        <>
            <div className='card_movies' id={title} onMouseOver={mouseOnCard} onMouseOut={mouseOutsideCard}>
                <img src={src} />
                {isHover === true ? <>
                    <div className='list_button'></div>
                        <div className='title_movies'>{title}</div>
                </> : null}
            </div>
            <div className='mouseout'>
            </div>
        </>

    );
}

export default Cardmovies;
