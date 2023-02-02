import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='flex flex-col h-screen items-center justify-center'>
            <h2 className='text-4xl font-semibold mb-3'>Something Went Wrong...</h2>
            <Link to='/login' className='text-blue-500 underline'>Please Login</Link>
        </div>
    );
};

export default ErrorPage;