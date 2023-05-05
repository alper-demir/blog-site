import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from './components/MainPage';
import Users from './components/Users';
import CreateUser from './components/CreateUser';
import SignUp from './components/SignUp'
import Categories from "./components/Categories";
import CategoryEdit from "./components/CategoryEdit";
import CategoryCreate from "./components/CategoryCreate";
import Login from "./components/Login"
import Authentication from "./context/authentication";
import { useState } from 'react'
const router = createBrowserRouter([
  { path: '/admin/create-user', element: (<CreateUser />) },
  { path: '/auth/login', element: (<Login />) },
  { path: '/sign-up', element: (<SignUp />) },
  { path: '/admin/category-edit/:id', element: (<CategoryEdit />) },
  { path: '/admin/category-create', element: (<CategoryCreate />) },
  { path: '/admin/categories', element: (<Categories />) },
  { path: '/admin/users', element: (<Users />) },
  { path: '/', element: (<MainPage />) },
  // { path: '/', element: (<MainPage />) },
  // { path: '/', element: (<MainPage />) },
])

function App() {
  const [token, setToken] = useState('')
  const [authentication, setAuthentication] = useState(false)

  const data = {
    token,
    setToken,
    authentication,
    setAuthentication
  }
  return (
    <Authentication.Provider value={data}>
      <Navbar />
      <RouterProvider router={router} />
    </Authentication.Provider>
  );
}

export default App;
