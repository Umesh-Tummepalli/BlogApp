import {createBrowserRouter} from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Layout from "../pages/Layout";
import LoginForm from "../pages/Login";
import { RegistrationForm } from "../pages/Register";
import Home from "../pages/Home";
import Blog from "../pages/Blog";
import NewBlog from "../pages/NewBlog";
import About from "../pages/About";
import Contact from "../pages/Contact";
import NotFound from "../pages/PageNotFound";


const routes=createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                path:'',
                element:<LandingPage/>
            },
            {
                path:'login',
                element:<LoginForm/>
            },
            {
                path:'register',
                element:<RegistrationForm/>
            },
            {
                path:"home",
                element:<Home/>
            },
            {
                path:'blog/:id',
                element:<Blog/>,
            },
            {
                path:'blog/new',
                element:<NewBlog/>
            },
            {
                path:'about',
                element:<About/>
            },
            {
                path:'contact',
                element:<Contact/>
            },
        ],
    },
    {
        path:'*',
        element:<NotFound/>
    }
])

export default routes;