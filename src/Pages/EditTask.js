import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const EditTask = () => {
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const { data: task = [], isLoading, refetch } = useQuery({
        queryKey: [''],
        queryFn: () => fetch(`https://job-task-zedblock.vercel.app/get-task?id=${id}&name=${user.name}&password=${user.password}`)
            .then(res => res.json())
    })
    const { title, description } = task;

    const handleEditTask = (e) => {
        e.preventDefault();

        const form = e.target;
        const title = form.title.value;
        if (title.length > 50) {
            return setTitleError('text-red-500 font-semibold')
        } else {
            setTitleError('');
        }
        const description = form.description.value;
        if (description.length > 120) {
            return setDescriptionError('text-red-500 font-semibold')
        } else {
            setTitleError('');
        }

        const editedTask = {
            id,
            name: user.name,
            password: user.password,
            title,
            description
        }
        fetch('https://job-task-zedblock.vercel.app/edit-task', {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(editedTask)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    navigate(`/details/${id}`)
                    toast.success('Task edited successfully')
                } else if (data.modifiedCount < 1) {
                    toast.error('Please make edit the task before submitted')
                }
            })
    }

    if (isLoading) {
        return <p className='text-2xl flex justify-center'>Loading...</p>
    }

    return (
        <form className='sm:max-w-[500px] w-full sm:mx-auto mx-2 md:my-24 my-14 shadow-lg p-5 border rounded-md' onSubmit={handleEditTask}>
            <div className='mb-4'>
                <div className='mb-5'>
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                    <input
                        defaultValue={title}
                        type="text"
                        name="title"
                        id="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                         focus:border-blue-500 block w-full p-2.5"
                        placeholder="Insert Task Title"
                        required
                    />
                    <p className={`text-xs mt-1 ${titleError}`}>Maximum character length (0/50) character.</p>
                </div>
                <div>
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                    <textarea
                        defaultValue={description}
                        name='description'
                        id="description"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Description...">
                    </textarea>
                    <p className={`text-xs mt-1 ${descriptionError}`}>Maximum character length (0/120) character.</p>
                </div>
            </div>
            <button type="submit" className='text-white py-1 px-3 bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300'>Add Task</button>
        </form>
    );
};

export default EditTask;