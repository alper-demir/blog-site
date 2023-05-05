import React from 'react'
import axios from 'axios'
import { useState } from 'react'
const CreateUser = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState({ text: "", color: "" })

    const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    }
    const addUser = async (e) => {
        e.preventDefault()

        if (!firstName.length < 3 && !lastName.length < 3 && email !== "" && password.length > 4) {
            const response = await axios.post("http://localhost:5000/sign-up", data)
            console.log(response.data)
            if (response.status === 200 && response.statusText === "OK") {
                setMessage({ text: response.data.message || "User created successfully", color: "bg-green-300" })
                setTimeout(() => {
                    setMessage({ text: "", color: "" })
                }, 2000)
            }
        }
        else {
            setMessage({ text: "Fill all inputs correctly", color: "bg-yellow-300" })
            setTimeout(() => {
                setMessage({ text: "", color: "" })
            }, 3000)
        }
    }


    return (
        <>
            {
                message.text &&
                <div className={`${message.color} text-center text-white p-2`} >
                    <p>{message.text}</p>
                </div>
            }
            <div className='flex justify-center bg-slate-200 items-center'>

                <form action="" className=' my-[150px] bg-slate-300 p-5 rounded-lg' encType="multipart/form-data">
                    <div className='flex flex-col text-right p-2'>
                        <div className='m-1'>
                            <label className='mr-3' htmlFor="firstname">First Name:</label>
                            <input className='rounded px-2 py-1' type="text" name='firstname' onChange={(e) => { setFirstName(e.target.value) }} />
                        </div>
                        <div className='m-1'>
                            <label className='mr-3' htmlFor="lastname">Last Name:</label>
                            <input className='rounded px-2 py-1' type="text" name='lastname' onChange={(e) => { setLastName(e.target.value) }} />
                        </div>
                        <div className='m-1'>
                            <label className='mr-3' htmlFor="email">Email:</label>
                            <input className='rounded px-2 py-1' type="email" name='email' onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className='m-1'>
                            <label className='mr-3' htmlFor="email">Password:</label>
                            <input className='rounded px-2 py-1' type="password" name='password' onChange={(e) => { setPassword(e.target.value) }} />
                        </div>

                        <div className='mt-2'>
                            <button type="submit" className=' bg-indigo-300 text-white rounded py-1 px-4 hover:bg-indigo-400' onClick={addUser}>Sign up</button>
                        </div>
                    </div>

                </form>

            </div>
        </>
    )
}

export default CreateUser