import React from 'react';

const Button = (props) => {
    const {classes,type,onclick,text,icon} = props;
   
    return (
        <div>
            <button className={classes} type={type} onClick={onclick}>{icon?(icon):(null)}{text}</button>
        </div>
    );
}

export default Button;
