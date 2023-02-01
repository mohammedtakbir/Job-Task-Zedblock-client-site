import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isUserLogin, setIsUserLogin] = useState('');

    useEffect(() => {
        const user = localStorage.getItem('user');
        setIsUserLogin(user);
    }, [isUserLogin])

    return (
        <nav>
            <ul className='my-10 text-center flex justify-center gap-5'>
                {isUserLogin ?
                    <>
                        <li><Link to='/tasks' className='btn'>My Tasks</Link></li>
                        <li><Link to='/add-task' className='btn'>Add Task</Link></li>
                    </>
                    :
                    <>
                        <li>
                            <Link to='/login' className='btn'>Login</Link>
                        </li>
                        <li>
                            <Link to='/register' className='btn'>Register</Link>
                        </li>
                    </>
                }
            </ul>
        </nav>
    );
};

export default Navbar;