import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.tsx'
import { Login } from './components/Login'
import { createBrowserRouter , RouterProvider} from 'react-router-dom'

type RouteConfig = {
  path: string
  element: JSX.Element
  children?: RouteConfig[]
}

const routes: RouteConfig[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />
      },
    ]
  }
]

const router = createBrowserRouter(routes)

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
)

