import React from 'react'
import axios from 'axios'
import { useState } from 'react'
const CreateUser = () => {

    const [category, setCategory] = useState('')


    const addCategory = async (e) => {
        e.preventDefault()
        const response = await axios.post("http://localhost:5000/category-create", { name: category })
        if (response.status === 200) {
            console.log("Kategori eklendi")
            window.location.assign(`/admin/categories`)
        }
    }
    return (
        <>
            <div className='flex justify-center bg-slate-200 items-center'>

                <form action="" className=' my-[150px] bg-slate-300 p-5 rounded-lg' encType="multipart/form-data">
                    <div className='flex flex-col text-right p-2'>
                        <div className='m-1'>
                            <label className='mr-3' htmlFor="category">Category:</label>
                            <input className='rounded px-2 py-1' type="text" name='category' onChange={(e) => { setCategory(e.target.value) }} />
                        </div>
                        <div className='mt-2'>
                            <button type="submit" className=' bg-indigo-300 text-white rounded py-1 px-4 hover:bg-indigo-400' onClick={addCategory}>Add</button>
                        </div>
                    </div>

                </form>

            </div>
        </>
    )
}

export default CreateUser