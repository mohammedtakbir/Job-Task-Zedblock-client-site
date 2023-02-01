import React from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
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

        fetch(`http://localhost:5000/login`, {
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
                    navigate('/tasks')
                    return toast.success('Login successfully');
                }
                toast.error(data.message);
            })

    }

    return (
        <section className='flex justify-center'>
            <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                <form class="space-y-6" action="#" onSubmit={handleSubmit}>
                    <h5 class="text-xl font-medium text-gray-900 text-center">Login</h5>
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
                        <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Insert Your Name" required />
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>
                    <div class="text-sm font-medium text-gray-500">
                        Not registered? <Link to='/register' class="text-blue-700 hover:underline">Create account</Link>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;