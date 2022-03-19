import React from 'react';

const Button = (props) => {
    const {classes,type,onclick,text} = props;
   
    return (
        <div>
            <button className={classes} type={type} onClick={onclick}>{text}</button>
        </div>
    );
}

export default Button;
