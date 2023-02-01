import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Task from './Task';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [refetch, setRefetch] = useState(false);
    const [loading, setLoading] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/get-tasks?name=${user.name}&password=${user.password}`)
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                setTasks(data);
            })
            .catch(err => setLoading(false));
    }, [user?.name, user?.password, refetch]);

    return (
        <div className='max-w-[800px] mx-auto'>
            <div className='flex justify-end'>
                <form className='w-[400px] flex gap-2 mb-3'>
                    <div className="relative w-[350px]">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            name='search'
                            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-gray-500"
                            placeholder="Search task"
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
                <div className='w-[30%] border p-4 shadow-lg rounded-md h-[160px] sticky top-0'>
                    <p className='mb-5 text-center font-semibold'>Action Menu</p>
                    <div className='flex flex-wrap justify-center gap-5'>
                        <div>
                            <Link to='/add-task' className='underline text-blue-500'>Add Task</Link>
                        </div>
                        <div>
                            <Link to='' className='underline text-blue-500'>Remove all tasks</Link>
                        </div>
                        <div className='flex items-center ml-5'>
                            <select
                                id="countries"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                            >
                                <option value='all'>All</option>
                                <option value='active'>Active</option>
                                <option value='completed'>Completed</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto w-[70%]">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Task Status</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        {loading ? '' :
                            <tbody>
                                {
                                    tasks.map(task => <Task setRefetch={setRefetch} refetch={refetch} task={task} />)
                                }
                            </tbody>}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Tasks;