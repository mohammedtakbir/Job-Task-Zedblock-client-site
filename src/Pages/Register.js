import React from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const password = form.password.value;
        const user = {
            name,
            password
        };

        fetch(`http://localhost:5000/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user))
                    navigate('/tasks');
                    window.location.reload();
                    return toast.success('Register successfully');
                }
                toast.error(data.message);
            })
    }

    return (
        <section className='flex justify-center'>
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <form className="space-y-6" action="#" onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 text-center">Register</h5>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Insert Your Name" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Register</button>
                    <div className="text-sm font-medium text-gray-500">
                        Already have an account? <Link to='/login' className="text-blue-700 hover:underline">Create account</Link>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Register;