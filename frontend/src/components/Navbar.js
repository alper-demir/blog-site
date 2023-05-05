import React, { useEffect, useContext } from 'react'
import Authentication from '../context/authentication'
import axios from 'axios'
const Navbar = () => {

    const data = useContext(Authentication)

    useEffect(() => {
        getData()
    },[])


    const getData = async () => {
        const token = (localStorage.getItem('token'))
        console.log("navbar local : " + token)
        const response = await axios.post("http://localhost:5000/api/token", { token: token })
        console.log(response)
        if (response.data.isTokenVaid && response.status === 200) {
            data.setAuthentication(true)
        }
        else {
            data.setAuthentication(false)
        }
    }
    console.log("navbar auth:" + data.authentication)
    if (data.authentication) {
        return (
            <nav className=' bg-slate-500  text-white'>
                <div className='flex items-center text-center justify-between p-2 container mx-auto'>
                    <div className=' '>
                        <a href="/"><h2 className='text-lg'> Blog </h2></a>
                    </div>
                    <div className='flex justify-between divide-x-2 divide-green-100'>
                        <div>
                            <a href="/" className='px-2'>Create Blog</a>
                            <a href="/" className='px-2'>Blogs</a>
                            <a href="/admin/category-create" className='px-2'>Create Category</a>
                            <a href="/admin/categories" className='px-2'>Categories</a>
                            <a href="/admin/create-user" className='px-2'>Create User</a>
                            <a href="/admin/users" className='px-2'>Users</a>
                        </div>
                    </div>

                </div>

                <div className='fixed top-1 right-1'>
                    <h5 className='text-[10px] font-bold '>admin</h5>
                </div>
            </nav>
        )
    }
    return (
        <nav className=' bg-slate-500  text-white'>
            <div className='flex items-center text-center justify-between p-2 container mx-auto'>
                <div className=' '>
                    <a href="/"><h2 className='text-lg'> Blog </h2></a>
                </div>
                <div className='flex justify-between divide-x-2 divide-green-100'>
                    <div>
                        <a href="/" className='px-2'>Blogs</a>
                    </div>
                    <div className='ml-1'>
                        <a href="/auth/login" className='px-2'>Login</a>
                        <a href="/sign-up" className='px-2'>Sign up</a>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default Navbar