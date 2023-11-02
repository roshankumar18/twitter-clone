import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import SignIn from './pages/SignIn/SignIn';
import Explore from './pages/Explore/Explore';
import Navbar from './components/Navbar/Navbar';
import Error from './pages/Error/Error';

const Layout = () => {
  return(
    <div className='md:w-8/12 mx-auto'>
    <Navbar/>
    <Outlet></Outlet>
    </div>
  )
}

const router = createBrowserRouter([
  {
  path:"/",
  element:<Layout/>,
  errorElement:<Error/>,
  children:[
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/profile/:id",
      element:<Profile/>
    },
    {
      path:"/signin",
      element:<SignIn/>
    },
    {
      path:"/logout",
      element:<SignIn/>
    },
    {
      path:"/explore",
      element:<Explore/>
    }
  ]
  }
  
])

function App() {
  return (
    <div>
    <RouterProvider router={router}></RouterProvider>
    </div>)
}

export default App;
