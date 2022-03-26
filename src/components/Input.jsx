import React from 'react';

const Input = (props) => {
    const {classes,type,name,label,id,required,placeholder,onChange,onKeyUp} = props;
    return (
        <div>
            <label htmlFor={label}>{label}</label>
            <input className={classes} type={type} id={id} name={name} placeholder={placeholder} required={required} onKeyUp={onKeyUp} onChange={onChange}/>
        </div>
    );
}

export default Input;
