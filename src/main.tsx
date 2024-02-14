import App from './App.jsx'
import './index.css'
import {Login} from './components/Login'
import {Register} from './components/Register'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login/>
      },
      {
        path: "register",
        element: <Register/>
      },
    ]
  }
])

