import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/authSlice";
import { IoSettingsSharp } from "react-icons/io5";
import { MdHomeRepairService } from "react-icons/md";

const Drawer = () => {
    const location = useLocation()
    const {user} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    
    return (
        <div className="flex flex-col w-[25%] bg-white border-r border-[lightgray] items-center justify-between">     
            <div className="flex flex-col items-center w-full mt-6">
                <h1 className="text-custom-textBlue text-2xl font-bold mb-16">C-Connect</h1>
                <Link to='/consumer/services' className={`pl-4 py-4 ${location.pathname === '/consumer/services' ? 'bg-custom-darkRed text-white hover:bg-custom-black': 'hover:bg-[#f2f2f2]'} w-[92%] flex items-center justify-start gap-4 rounded-lg`}>
                    <MdHomeRepairService size={17} color={location.pathname === '/consumer/services' ? 'white': 'black'}/>
                    <h2>Services</h2>
                </Link>
                <Link to='/consumer/settings' className={`pl-4 py-4 ${location.pathname === '/consumer/settings' ? 'bg-custom-darkRed text-white hover:bg-custom-black': 'hover:bg-[#f2f2f2]'} w-[92%] flex items-center justify-start gap-4 rounded-lg`}>
                    <IoSettingsSharp size={20} color={location.pathname === '/consumer/settings' ? 'white': 'black'}/>
                    <h2>Settings</h2>
                </Link>
            </div>
            <div className="flex flex-col gap-4 items-center w-[90%] rounded-md hover:bg-[#eaeaea] p-4 mb-4 cursor-pointer" onClick={() => dispatch(logout())}>
                <img src="/user.png" width={70} height={70}/>
                <h2>{user!.email}</h2>
                <h2 className="text-sm">Click to logout</h2>
            </div>
        </div>
    );
}
 
export default Drawer;