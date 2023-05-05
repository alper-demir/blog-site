import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const CategoryEdit = () => {

    const { id } = useParams();
    const [data, setData] = useState({})
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const response = await axios.get(`http://localhost:5000/api/category/${id}`)
        if (response.status === 200) {
            setData(response.data)
            console.log(response)
        }
    }

    const inputHandler = (e) => {
        setData({ id: id, name: e.target.value })
    }

    const sendData = {
        id: data.id,
        name: data.name
    }
    const updateCategory = async (e) => {
        e.preventDefault()
        const response = await axios.post(`http://localhost:5000/admin/category/${data.id}`, sendData)
        if (response.status === 200 && response.statusText === "OK") {
            console.log(response.data.message)
            window.location.assign(`/admin/categories?class=update&id=${data.id}`)
        }
        else {
            throw Error("Error occurred")
        }
    }

    return (
        <div>
            <form className='h-[30vh] flex justify-center items-center bg-slate-300'>
                <label htmlFor="" className='mr-4'>#{data.id}</label>
                <input type="text" value={data.name} className='px-2 rounded py-1' onChange={inputHandler} />
                <button type="submit" className='ml-3 bg-cyan-400 px-2 py-1 rounded hover:bg-cyan-500' onClick={updateCategory}>Save</button>
            </form>
        </div>
    )
}

export default CategoryEdit