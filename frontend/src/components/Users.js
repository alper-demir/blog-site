import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Users = () => {

    const [users, setUsers] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        blogData()
    }, [])

    const blogData = async () => {
        const response = await axios.get("http://localhost:5000/api/users")
        setUsers(response.data)
        console.log(response.data)
    }

    const deleteUser = async (id) => {
        const res = window.confirm("Are you sure to delete user has id " + id)
        if (res) {
            const response = await axios.post("http://localhost:5000/user-delete", {
                id: id
            })
            console.log(response)
            if (response.status === 200 && response.statusText === "OK") {
                blogData()
                setMessage(response.data.message)
                setTimeout(() => {
                    setMessage('')
                }, 2000)
            }
        }
    }

    return (
        <div >
            Users

            {
                message &&
                <div className='bg-gray-400 text-white text-center my-2'>
                    {message}
                </div>
            }

            <div className='flex items-center justify-center flex-wrap container mx-auto'>
                {
                    users &&
                    users.map(user => (
                        <div key={user.id} className='p-3 border-2 m-1 text-center '>
                            <div>
                                <img src={`/images/users/${user.image}`} alt={user.id} className='w-80 h-[24rem] border-indigo-300 border-2 object-cover' />
                            </div>
                            <div className='my-2'>
                                <p>Name: {user.firstName + " " + user.lastName}</p>
                                <p>Email: {user.email} </p>
                            </div>
                            <div className='grid grid-cols-2 mt-1'>
                                <button className='rounded px-3 bg-red-400 m-1' onClick={() => { deleteUser(user.id) }}>Delete</button>
                                <button className='rounded px-3 bg-blue-400 m-1'>Update</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Users