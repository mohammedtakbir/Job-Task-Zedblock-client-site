import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Task = ({ task, setRefetch, refetch }) => {
    const { title, status, _id } = task;
    const [checked, setChecked] = useState(status);

    const user = JSON.parse(localStorage.getItem('user'));

    const handleStatusChange = (value) => {
        fetch(`http://localhost:5000/status?status=${value}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setRefetch(!refetch)
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
                            onClick={() => handleStatusChange(!checked)}
                            type="checkbox" className="checkbox" checked={status && true}
                        />
                    </label>
                </td>
                <td>
                    <Link to='/details' className="underline text-blue-500">details</Link>
                </td>
            </tr>
        </>
    );
};

export default Task;