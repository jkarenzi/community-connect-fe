import { useEffect } from "react";
import Drawer from "../components/Drawer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getCategories } from "../redux/actions/categoryActions";
import { getExpenses } from "../redux/actions/expenseActions";
import ClipLoader from "react-spinners/ClipLoader";
import PieChart from "../components/PieChart";

const Dashboard = () => {
    const dispatch = useAppDispatch()
    const {categories, isFetchingCategories} = useAppSelector(state => state.category)
    // const {expenses, isFetchingExpenses} = useAppSelector(state => state.expense)
    useEffect(() => {
        dispatch(getCategories())
        dispatch(getExpenses({}))
    },[])
    return (
        <div className="w-full h-screen flex">
            <Drawer/>
            <div className="flex-1 flex flex-col items-center justify-between pt-6 pb-8 bg-[#f2f2f2] overflow-y-auto gap-20">
                <div className="flex flex-col w-[90%] items-center">
                    <h1 className="text-2xl font-semibold mb-12">Categories</h1>
                    <div className="flex flex-wrap w-full gap-8 items-center justify-center">
                        {!isFetchingCategories && categories.map(category => (
                        <div className={`${category.limit ? category.limit - category.totalExpenses > 0 ? 'bg-[rgba(0,255,0,0.1)] border-[1.5px] border-[rgb(0,255,0)]':'bg-[rgba(255,0,0,0.1)] border-[1.5px] border-[rgb(255,0,0,0.5)]':'bg-white shadow-md'} rounded-md flex flex-col items-center justify-center w-40 h-32 gap-4`}>
                            <h1>{category.name}</h1>
                            <h1>{category.totalExpenses}<sup>RWF</sup></h1>
                        </div>
                        ))}
                        {isFetchingCategories && <ClipLoader size={50} />}
                        {!isFetchingCategories && categories.length === 0 && <h2 className="mt-12">No categories found</h2>}
                    </div>
                    <div className="flex items-center w-full justify-center gap-12 mt-8">
                        <div className="flex items-center gap-4">
                            <div className="rounded-full w-2 h-2 bg-[rgb(0,255,0)]"></div>
                            <h2 className="text-sm">Total expenses do not exceed the category limit</h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="rounded-full w-2 h-2 bg-[rgb(255,0,0)]"></div>
                            <h2 className="text-sm">Total expenses exceed the category limit</h2>
                        </div>    
                    </div>
                </div>
                <div className="w-[90%] flex flex-col gap-8 items-center">
                    <h1 className="text-2xl font-semibold mb-8">Analytics</h1>
                    <div className="w-[90%] flex items-center justify-between">
                        <div className="w-80 h-80">
                            <PieChart/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Dashboard;