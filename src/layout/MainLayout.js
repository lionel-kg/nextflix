import React from 'react';
import Header from '../components/Header';

const Mainlayout = ({ children }) => {

    return (
        <div>
            <header>
                <Header/>
            </header>
            <main>
                {children}
            </main>
        </div>
    );
}

export default Mainlayout;
