import React from 'react';

const Select = (props) => {
    const {options,classes} = props;
    return (
        <div>
            <select className={classes} options={options.value}></select>
        </div>
    );
}

export default Select;
