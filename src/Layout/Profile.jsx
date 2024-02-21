import { IoReorderThreeOutline } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";

const Profile = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                   <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden"><IoReorderThreeOutline /></label>

                </div>
                <div className="drawer-side" >
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul  className="menu p-4 w-80 min-h-full bg-rose-300 text-base-content">
                        {/* Sidebar content here */}
                        <li><Link to='/abcd'>Sidebar Item 1</Link></li>
                        <li><Link to='/aaaa'>Sidebar Item 3</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Profile;
