import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/authSlice";

const Drawer = () => {
    const location = useLocation()
    const {user} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    
    return (
        <div className="flex flex-col w-[25%] bg-white border-r border-[lightgray] items-center justify-between">     
            <div className="flex flex-col items-center w-full mt-6">
                <h1 className="text-xl ml-4 font-bold mb-12 text-custom-black">budgetMaster</h1>
                <Link to='/' className={`pl-4 py-4 ${location.pathname === '/' ? 'bg-custom-black text-white hover:bg-custom-black': 'hover:bg-[#f2f2f2]'}  w-[92%] flex items-center justify-start rounded-lg`}>
                    Dashboard
                </Link>
                <Link to='/categories' className={`pl-4 py-4 ${location.pathname === '/categories' ? 'bg-custom-black text-white hover:bg-custom-black': 'hover:bg-[#f2f2f2]'} w-[92%] flex items-center justify-start rounded-lg`}>
                    Categories
                </Link>
                <Link to='/expenses' className={`pl-4 py-4 ${location.pathname === '/expenses' ? 'bg-custom-black text-white hover:bg-custom-black': 'hover:bg-[#f2f2f2]'} w-[92%] flex items-center justify-start rounded-lg`}>
                    Expenses
                </Link>
            </div>
            <div className="flex flex-col gap-4 items-center w-[90%] rounded-md hover:bg-[#eaeaea] p-4 mb-4 cursor-pointer" onClick={() => dispatch(logout())}>
                <img src="/user.png" width={70} height={70}/>
                <h2>{user!.email}</h2>
            </div>
        </div>
    );
}
 
export default Drawer;