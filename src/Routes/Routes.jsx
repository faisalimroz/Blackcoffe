import { createBrowserRouter } from "react-router-dom";
import Home from "../Page/Home/Home/Home";
import Main from "../Layout/Main";
import Sidebar1 from "../Page/Home/Home/Sidebar1/Sidebar1";
import Profile from "../Layout/Profile";
import Sideb from "../Profiles/Sideb/Sideb";
import MyBarChart from "../Profiles/Sideb/MyBarChart";
import MyPieChart from "../Profiles/Sideb/MyPie";
import WordMap from '../Profiles/Sideb/WordMap';
import EconomicGrowthChart from "../Profiles/Sideb/EconomicGrowthChart";
import LoginPage from "../Page/LoginPage/LoginPage";
const router=createBrowserRouter([
    {
        path:'/profile',
        element:<Profile></Profile>,
        children:[
            {
                path:'/profile',
                element: <MyBarChart></MyBarChart>
            },
           
            {
              path:'country',
              element: <MyBarChart></MyBarChart>
            },
            // {
            //     path:'aaaa',
            //     element:<Sideb></Sideb>
            //    },
               {
                path:'piechart',
                element:<MyPieChart></MyPieChart>
               },
               {
                path:'wordmap',
                element: <WordMap></WordMap>
               },
               {
                path:'economicgrowth',
                element: <EconomicGrowthChart></EconomicGrowthChart>
               }
        ]
    }
        ,
        {
            path:'/',
            element: <Main></Main>,
            children:[
                
               {
                path:'/',
                element:<LoginPage></LoginPage>
               }
            ]
        
            }
    

    
]);
export default router;
