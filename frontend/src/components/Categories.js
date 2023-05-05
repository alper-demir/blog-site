import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

const Categories = () => {

    useEffect(() => {
        getData()
        getQueryParams()
    }, [])
    const [categories, setCategories] = useState([])
    const [message, setMessage] = useState({ text: "", color: "" })

    const getData = async () => {
        const response = await axios.get("http://localhost:5000/api/categories")
        if (response.status === 200) {
            setCategories(response.data)
        }
    }

    function getQueryParams() {
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has("id") && searchParams.has("class")) {
            if (searchParams.get("class") === "update") {
                setMessage({ text: `id number ${searchParams.get("id")} has been updated`, color: "bg-green-300" })
                setTimeout(() => {
                    setMessage({ text: "", color: "" })
                    window.history.replaceState({}, "", window.location.pathname); // query bilgilerini siler ve sayfa yenilendiğinde tekrar aynı işlemin yapılmasını engeller.
                }, 2000)
            }
            else if (searchParams.get("class") === "delete") {
                setMessage({ text: `id number ${searchParams.get("id")} has been deleted`, color: "bg-red-300" })
                setTimeout(() => {
                    setMessage({ text: "", color: "" })
                    window.history.replaceState({}, "", window.location.pathname); // query bilgilerini siler ve sayfa yenilendiğinde tekrar aynı işlemin yapılmasını engeller.
                }, 2000)
            }

        }
    }

    const deleteCategory = async (e, id) => {
        e.preventDefault()
        const response = window.confirm("Are you sure to delete category #" + id)
        if (response) {
            const response = await axios.post("http://localhost:5000/category-delete", { id: id })
            if (response.status === 200) {
                console.log(response.data.message)
                getData()
                window.location.assign(`/admin/categories?class=delete&id=${id}`)
            }
        }
    }

    return (
        <>
            {
                message.text &&
                <div className={`text-white text-center p-2 ${message.color}`}>
                    {message.text}
                </div>
            }
            <div className="flex flex-col container mx-auto mt-5">
                <h3 className='text-center my-1'>Categories</h3>
                <div className="overflow-x-auto">
                    <div className="p-1.5 w-full inline-block align-middle">
                        <div className="overflow-hidden border rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "> ID </th>
                                        <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "> Name </th>
                                        <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase " >  Edit  </th>
                                        <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase " >  Delete  </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {
                                        categories.map(category => (
                                            <tr key={category.id}>

                                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                                    {category.id}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                                    {category.name}
                                                </td>

                                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                    <Link className="text-green-500 hover:text-green-700" to={`/admin/category-edit/${category.id}`}> Edit</Link>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                    <Link className="text-red-500 hover:text-red-700" to="/" onClick={(e) => { deleteCategory(e, category.id) }}> Delete </Link>
                                                </td>
                                            </tr>
                                        ))
                                    }


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categories