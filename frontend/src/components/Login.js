import React, { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import Authentication from '../context/authentication'
const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const data = useContext(Authentication)
    console.log(data)
    const login = async (e) => {
        e.preventDefault()
        const response = await axios.post("http://localhost:5000/login", { email: email, password: password })
        console.log(response)
        if (response.status === 200 && response.statusText === "OK") {
            data.setAuthentication(true)
            data.setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
        }
    }

    return (
        <div>
            <div className='flex justify-center bg-slate-200 items-center'>

                <form action="" className=' my-[150px] bg-slate-300 p-5 rounded-lg' encType="multipart/form-data">
                    <div className='flex flex-col text-right p-2'>
                        <div className='m-1'>
                            <label className='mr-3' htmlFor="email">Email:</label>
                            <input className='rounded px-2 py-1' type="email" name='email' onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className='m-1'>
                            <label className='mr-3' htmlFor="email">Password:</label>
                            <input className='rounded px-2 py-1' type="password" name='password' onChange={(e) => { setPassword(e.target.value) }} />
                        </div>

                        <div className='mt-2'>
                            <button type="submit" className=' bg-indigo-300 text-white rounded py-1 px-4 hover:bg-indigo-400' onClick={login}>Sign up</button>
                        </div>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default Login   