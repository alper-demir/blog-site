import React, { useEffect, useState } from 'react'
import axios from 'axios'

const MainPage = () => {

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        blogData()
    }, [])

    const blogData = async () => {
        const response = await axios.get("http://localhost:5000/api/blogs")
        setBlogs(response.data)
        console.log(response.data)
    }

    return (
        <div>
            MainPage
            <div className='flex items-center justify-center'>
                {
                    blogs &&
                    blogs.map(blog => (
                        <div key={blog.id} className='p-3 border-2 m-1 text-center min-w-min'>
                            <p>Id: {blog.id}</p>
                            <div className='max-w-xs'>
                                <img src={`/images/blogs/${blog.image}`} alt={`${blog.id}`}/>
                            </div>
                            <p>Description: {blog.description}</p>
                            <p>Mainpage: {blog.mainpage}</p>
                            <p>Approved: {blog.approved}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MainPage