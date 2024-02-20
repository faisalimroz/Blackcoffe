import { createBrowserRouter } from "react-router-dom";
import Home from "../Page/Home/Home/Home";
import Main from "../Layout/Main";
import Sidebar1 from "../Page/Home/Home/Sidebar1/Sidebar1";
import Profile from "../Layout/Profile";
import Sideb from "../Profiles/Sideb/Sideb";

const router=createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element: <Home></Home>
            }
        ]
    
        },
        {
            path:'/profile',
            element: <Profile></Profile>,
            children:[
                
               {
                path:'aaaa',
                element:<Sideb></Sideb>
               }
            ]
        
            }
    

    
]);
export default router;
