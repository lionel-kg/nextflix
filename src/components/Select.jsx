import {React,useEffect} from 'react';

const Select = (props) => {
    const { options, classes, onchange } = props;
    
    return (
        <>
            <select className={classes} onChange={onchange}>
                {options.map((option) =>{
                    return <option value={option.value}>{option.label}</option>
                })
                }
            </select>
        </>
    );
}

export default Select;
