import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Task from './Task';

const Tasks = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refetch, setRefetch] = useState(false);
    const [noTask, setNoTask] = useState('');

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://job-task-zedblock.vercel.app/get-tasks?name=${user?.name}&password=${user?.password}`)
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    setNoTask('No Task Found');
                }
                setTasks(data);
                setIsLoading(false);
            })
            .catch(err => setIsLoading(false))
    }, [user.name, user.password, refetch]);


    const handleRemoveAllTasks = () => {
        fetch(`https://job-task-zedblock.vercel.app/remove-completed-tasks?name=${user?.name}&password=${user?.password}`)
            .then(res => res.json())
            .then(data => {
                setTasks(data);
                setRefetch(!refetch);
            })
    }

    const handleSortTaskStatus = (value) => {
        fetch(`https://job-task-zedblock.vercel.app/tasks-sorting?sortValue=${value}&name=${user.name}&password=${user.password}`)
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    setNoTask('No Task Found');
                }
                setTasks(data);
            })
    }

    //* search by title
    const handleSearchByTitle = (e) => {
        e.preventDefault();
        const searchText = e.target.search.value;

        fetch(`https://job-task-zedblock.vercel.app/task-search?searchText=${searchText}&name=${user?.name}&password=${user?.password}`)
            .then(res => res.json())
            .then(data => {
                if (data.length === 0) {
                    setNoTask('No Task Found');
                }
                setTasks(data);
            })
    }



    if (isLoading) {
        return <p className='text-2xl flex justify-center'>Loading...</p>
    }

    return (
        <div className='max-w-[800px] mx-auto'>
            <div className='flex justify-end'>
                <form className='w-[400px] flex gap-2 mb-3' onSubmit={handleSearchByTitle}>
                    <div className="relative w-[350px]">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            name='search'
                            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
                            placeholder="Search by title"
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="text-white right-2.5 bottom-0 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
            <div className='flex gap-5'>
                <div className='w-[40%] border p-4 shadow-lg rounded-md h-[190px] sticky top-0'>
                    <p className='mb-5 text-center font-semibold'>Action Menu</p>
                    <div className='flex flex-wrap justify-center gap-5'>
                        <div>
                            <Link to='/add-task' className='underline text-blue-500'>Add Task</Link>
                        </div>
                        <div>
                            <Link onClick={handleRemoveAllTasks} to='' className='underline text-blue-500'>Remove completed tasks</Link>
                        </div>
                        <div className='flex items-center ml-5'>
                            <select
                                onChange={(e) => handleSortTaskStatus(e.target.value)}
                                id="countries"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                            >
                                <option value='all'>All</option>
                                <option value={false}>Active</option>
                                <option value={true}>Completed</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto w-[60%]">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Task Status</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.length === 0 ?
                                <p className='mt-2 text-xl font-semibold'>{noTask}</p> :
                                tasks.map(task => <Task refetch={refetch} setRefetch={setRefetch} task={task} />)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Tasks;