import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul className='my-10 text-center'>
                <li>
                    <Link to='/login' className='mr-4 btn'>Login</Link>
                    <Link to='/register' className='btn'>Register</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;