import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Task = ({ task, refetch, setRefetch }) => {
    const { title, status, _id } = task;
    const [checked, setChecked] = useState(status);

    const user = JSON.parse(localStorage.getItem('user'));

    const handleStatusChange = (id, value) => {
        fetch(`https://job-task-zedblock.vercel.app/status?id=${id}&state=${value}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    // setRefetch(!refetch)
                }
            })
        setChecked(value);
    }


    return (
        <>
            <tr>
                <td>
                    <Link to={`/details/${_id}`}>{title}</Link>
                </td>
                <td>
                    <label>
                        <input
                            onClick={() => handleStatusChange(_id, !checked)}
                            type="checkbox" className="checkbox" checked={checked && true}
                        />
                    </label>
                </td>
                <td>
                    <Link to={`/details/${_id}`} className="underline text-blue-500">details</Link>
                </td>
            </tr>
        </>
    );
};

export default Task;