import CancelIcon from '@material-ui/icons/CancelOutlined';
import React from 'react';
import Button from './Button';

const Modal = (props) => {
    const {bannerStyle,movie,modal,modalStatut} = props;
    return (
        <div className={`modal ${modalStatut && "open"}`}>
            <div className="modal_banner" style={bannerStyle}>
                <div className="modal_content">
                    <h3 className="modal_title">{movie.title || movie.original_title}</h3>
                    <p>
                        {movie.overview}
                    </p>
                </div>
            </div>
            <Button classes={"modal_close"} onclick={modal} text={<CancelIcon fontSize='large' />}/>
        </div>
    );
}

export default Modal;
