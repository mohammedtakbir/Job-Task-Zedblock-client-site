import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Details = () => {
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const { data: task = {}, isLoading, refetch } = useQuery({
        queryKey: ['get-task'],
        queryFn: () => fetch(`https://job-task-zedblock.vercel.app/get-task?id=${id}&name=${user.name}&password=${user.password}`)
            .then(res => res.json())
    })

    const { title, description, _id } = task;

    const handleDeleteTask = (id) => {
        fetch(`https://job-task-zedblock.vercel.app/delete-task?id=${id}&name=${user.name}&password=${user.password}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    refetch();
                    navigate('/tasks');
                }
            })
    }

    if (isLoading) {
        return <p className='flex justify-center text-2xl'>Loading...</p>
    }

    return (
        <>
            <div className='max-w-[400px] mx-auto border p-4 rounded-lg'>
                <h3 className='text-xl font-semibold mb-3'>{title}</h3>
                <p className='mb-4 text-sm'>{description}</p>
                <div>
                    <button onClick={() => handleDeleteTask(_id)} className='text-red-500 underline inline-block mr-5'>Delete</button>
                    <Link to={`/edit-task/${_id}`} className='text-green-500 underline inline-block'>Edit</Link>
                </div>
            </div>
        </>
    );
};

export default Details;