import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../public/assets/logo.png';
import Button from './Button';
import Select from './Select';

const Header = (props) => {
    const options = [
        { value: 'français', label: 'Français' },
        { value: 'english', label: 'English' }      ]
        return (
        <div className='header_main'>
            <div className='container'>
                <Image src={logo}
                    alt=""
                    width={300}
                    height={100} />

            </div>

            <nav className='header_nav'>
                <ul className='nav_list'>
                    <li className='nav_item'>
                        <Select classes="select" options={options} />
                    </li>
                    <li className='nav_item'>
                        <Link href="/register">
                            <Button text={"s'inscrire"} classes="btn btn_color_red"/>
                        </Link>
                    </li>
                </ul>
            </nav>

        </div>
    );
}

export default Header;
