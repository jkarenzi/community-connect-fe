import Drawer from "../components/Drawer";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useFormik } from "formik";
import { createExpense, deleteExpense, updateExpense, getExpenses } from "../redux/actions/expenseActions";
import { dateFilterSchema, expenseSchema } from "../validationSchema/expenseSchema";
import { Expense } from "../types/Expense";
import ClipLoader from 'react-spinners/ClipLoader'
import { resetStatus } from "../redux/expenseSlice";
import { MdFilterAlt } from "react-icons/md";
import { getCategories } from "../redux/actions/categoryActions";

interface InitValues {
    description: string,
    categoryId:string,
    amount:string,
    date: Date | string
}

interface InitUpdateValues {
    description: string | undefined,
    categoryId:string | undefined,
    amount:string | undefined,
    date: Date | undefined
}

interface IDateQuery {
    from: Date | string,
    to: Date | string 
}

const Expenses = () => {
    const [toggleDeleteOverlay, setToggleDeleteOverlay] = useState<{state:boolean, id:number|null}>({state:false, id:null})
    const [toggleCreateOverlay, setToggleCreateOverlay] = useState(false)
    const [toggleUpdateOverlay, setToggleUpdateOverlay] = useState<{state:boolean, id:number|null}>({state:false, id:null})
    const {categories} = useAppSelector(state => state.category)
    const {expenses, isLoading, isFetchingExpenses,status} = useAppSelector(state => state.expense)
    const dispatch = useAppDispatch()
    const [currentExpense, setCurrentExpense] = useState<Expense | null>(null)
    const [toggleCategoryFilter, setToggleCategoryFilter] = useState(false)
    const [toggleDateFilter, setToggleDateFilter] = useState(false)
    const [categoryQuery, setCategoryQuery] = useState<number[]>([])

    
    const handleCategoryChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked){
            setCategoryQuery([...categoryQuery, parseInt(e.target.value)])
        }else{
            setCategoryQuery(categoryQuery.filter(category => category !== parseInt(e.target.value)))
        }
    }

    useEffect(() => {
        console.log(categoryQuery)
    },[categoryQuery])

    useEffect(() => {
        dispatch(getExpenses({}))
        dispatch(getCategories())
    },[])

    useEffect(() => {
        if(status === 'successful'){
            setToggleCreateOverlay(false)
            setToggleUpdateOverlay({state:false,id:null})
            setToggleDeleteOverlay({state:false,id:null})
            dispatch(resetStatus())
        }
    },[status])

    useEffect(() => {
        if(toggleUpdateOverlay.state){
            setCurrentExpense(
                expenses.find((expense) => expense.id === toggleUpdateOverlay.id)!
            )
        }else{
            setCurrentExpense(null)
        }
    },[toggleUpdateOverlay])

    const formik = useFormik({
        initialValues:{
            description: '',
            categoryId:'',
            amount:'',
            date: ''
        } as InitValues,
        onSubmit: (formData) => {
            dispatch(createExpense({
                ...formData,
                categoryId: parseInt(formData.categoryId as string),
                amount: parseInt(formData.amount as string),
                date: formData.date as Date
            }))
        },
        validationSchema: expenseSchema
    })

    const updateFormik = useFormik({
        initialValues:{
            description: currentExpense?.description,
            categoryId:currentExpense?.category.id,
            amount:currentExpense?.amount,
            date: currentExpense?.date
        } as InitUpdateValues,
        onSubmit: (formData) => {
            dispatch(updateExpense({
                id: toggleUpdateOverlay.id as number,
                formData: {
                    description: formData.description as string,
                    categoryId: parseInt(formData.categoryId as string),
                    amount: parseInt(formData.amount as string),
                    date: formData.date as Date
                }
            }))
        },
        validationSchema: expenseSchema,
        enableReinitialize: true
    })

    const dateFormik = useFormik({
        initialValues: {
            from: '',
            to:''
        } as IDateQuery,
        onSubmit: (formData) => {
            console.log(formData)
            dispatch(getExpenses({dateQuery: {
                from: formData.from as Date,
                to: formData.to ? formData.to as Date : null
            }}))
        },
        validationSchema: dateFilterSchema
    })

    const handleCategorySubmit = () => {
        if(categoryQuery.length === 0){
            return;
        }

        dispatch(getExpenses({categoryQuery}))
    }

    return (
        <div className="w-full h-screen flex">
            { toggleCategoryFilter && <div className="fixed w-full h-screen flex items-center justify-center z-10 bg-black bg-opacity-50">
                <div className="flex flex-col items-center justify-between rounded-lg bg-white w-[25rem]">
                    <div className="flex items-center justify-between w-full pr-2 pl-4 py-3 border-b border-custom-drawerBorder">
                        <h2>Filter by category</h2>
                        <IoClose size='25' onClick={() => setToggleCategoryFilter(false)} className="cursor-pointer"/>
                    </div>
                    <div className="flex flex-col px-4 pb-4 pt-8 w-full">
                        {categories.map((category) => (
                        <div className="flex items-center gap-4 w-full">
                            <input type="checkbox" value={category.id} onChange={handleCategoryChange} checked={categoryQuery.includes(category.id)}/>
                            <h2>{category.name}</h2>
                        </div>
                        ))}
                        <button 
                            className="flex items-center justify-center w-full h-10 bg-custom-black text-white rounded-md mt-8"
                            onClick={handleCategorySubmit}
                        >
                            {isLoading ? <ClipLoader size={20} color="white"/> : 'Submit'}
                        </button>
                    </div>
                    
                </div>
            </div>}
            { toggleDateFilter && <div className="fixed w-full h-screen flex items-center justify-center z-10 bg-black bg-opacity-50">
                <div className="flex flex-col items-center justify-between rounded-lg bg-white w-[25rem]">
                    <div className="flex items-center justify-between w-full pr-2 pl-4 py-3 border-b border-custom-drawerBorder">
                        <h2>Filter by date</h2>
                        <IoClose size='25' onClick={() => setToggleDateFilter(false)} className="cursor-pointer"/>
                    </div>
                    <form onSubmit={dateFormik.handleSubmit} className="flex flex-col gap-2 px-4 pb-4 pt-8 w-full">
                        <div className="flex gap-2 flex-col w-full">
                            <label className="m-0">From</label>
                            <input 
                                id="from"
                                type="date" 
                                placeholder="Enter from date" 
                                className={`border ${dateFormik.touched.from && dateFormik.errors.from ? 'border-red-500':'border-black'} outline-none rounded-md w-full h-10 pl-4`}
                                {...dateFormik.getFieldProps('from')}
                            />
                            {dateFormik.touched.from && dateFormik.errors.from && <div className="text-red-500 text-sm">{dateFormik.errors.from}</div>}
                        </div>
                        <div className="flex gap-2 flex-col w-full">
                            <label className="m-0">To</label>
                            <input 
                                id="to"
                                type="date" 
                                placeholder="Enter to date" 
                                className={`border ${dateFormik.touched.to && dateFormik.errors.to ? 'border-red-500':'border-black'} outline-none rounded-md w-full h-10 pl-4`}
                                {...dateFormik.getFieldProps('to')}
                            />
                            {dateFormik.touched.to && dateFormik.errors.to && <div className="text-red-500 text-sm">{dateFormik.errors.to}</div>}
                        </div>
                        <button type='submit' className="flex items-center justify-center w-full h-10 bg-custom-black text-white rounded-md mt-8">{isLoading ? <ClipLoader size={20} color="white"/> : 'Submit'}</button>
                    </form>
                </div>
            </div>}
            { toggleDeleteOverlay.state && <div className="fixed w-full h-screen flex items-center justify-center z-10 bg-black bg-opacity-50">
                <div className="flex flex-col items-center justify-between rounded-lg bg-white w-[30rem] h-48">
                    <div className="flex items-center w-full pl-4 py-3 border-b border-gray-400">
                        Delete expense?
                    </div>
                    <div className="flex flex-col w-full  items-start gap-8 pb-6  px-4">
                        <h2 className="text-left m-0">This action can not be undone</h2>
                        <div className="w-full flex items-center justify-end gap-6">
                            <button className="w-20 h-10 flex items-center justify-center bg-transparent border border-black rounded-md" onClick={() => setToggleDeleteOverlay({state:false, id:null})}>Cancel</button>
                            <button className="w-20 h-10 flex items-center justify-center text-white bg-red-500 rounded-md" onClick={() => dispatch(deleteExpense(toggleDeleteOverlay.id as number))}>{isLoading ? <ClipLoader size={20} color="white"/> : 'Delete'}</button>
                        </div>
                    </div>
                </div>
            </div>}
            { toggleCreateOverlay && <div className="fixed w-full h-screen flex items-center justify-center z-10 bg-black bg-opacity-50">
                <div className="flex flex-col items-center justify-between rounded-lg bg-white w-[25rem]">
                    <div className="flex items-center justify-between w-full pr-2 pl-4 py-3 border-b border-custom-drawerBorder">
                        <h2>Create expense</h2>
                        <IoClose size='25' onClick={() => setToggleCreateOverlay(false)} className="cursor-pointer"/>
                    </div>
                    <form onSubmit={formik.handleSubmit} className="w-[90%] flex flex-col gap-4 pb-8">
                        <div className="flex gap-2 flex-col w-full">
                            <label className="m-0">Description</label>
                            <input 
                                id="description"
                                type="text" 
                                placeholder="Enter description" 
                                className={`border ${formik.touched.description && formik.errors.description ? 'border-red-500':'border-black'} outline-none rounded-md w-full h-10 pl-4`}
                                {...formik.getFieldProps('description')}
                            />
                            {formik.touched.description && formik.errors.description && <div className="text-red-500 text-sm">{formik.errors.description}</div>}
                        </div>
                        <div className="flex gap-2 flex-col w-full">
                            <label className="m-0">Category</label>
                            <select id="category" className={`border ${formik.touched.categoryId && formik.errors.categoryId ? 'border-red-500':'border-black'} rounded-md h-10`} {...formik.getFieldProps('categoryId')}>
                                <option disabled selected>Select Category</option>
                                {categories.map(category => (
                                    <option value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            {formik.touched.categoryId && formik.errors.categoryId && <div className="text-red-500 text-sm">{formik.errors.categoryId}</div>}
                        </div>
                        <div className="flex gap-2 flex-col w-full">
                            <label className="m-0">Amount</label>
                            <input 
                                type="number" 
                                placeholder="Enter amount" 
                                className={`border ${formik.touched.amount && formik.errors.amount ? 'border-red-500':'border-black'} outline-none rounded-md w-full h-10 pl-4`}
                                {...formik.getFieldProps('amount')}
                            />
                            {formik.touched.amount && formik.errors.amount && <div className="text-red-500 text-sm">{formik.errors.amount}</div>}
                        </div>
                        <div className="flex gap-2 flex-col w-full">
                            <label className="m-0">Date</label>
                            <input 
                                type="date" 
                                placeholder="Enter date" 
                                className={`border ${formik.touched.date && formik.errors.date ? 'border-red-500':'border-black'} outline-none rounded-md w-full h-10 pl-4`}
                                {...formik.getFieldProps('date')}
                            />
                            {formik.touched.date && formik.errors.date && <div className="text-red-500 text-sm">{formik.errors.date as string}</div>}
                        </div>
                        <button type='submit' className="flex items-center justify-center w-full h-10 bg-custom-black text-white rounded-md mt-8">{isLoading ? <ClipLoader size={20} color="white"/> : 'Submit'}</button>
                    </form>
                </div>
            </div>}
            { toggleUpdateOverlay.state && <div className="fixed w-full h-screen flex items-center justify-center z-10 bg-black bg-opacity-50">
                <div className="flex flex-col items-center justify-between rounded-lg bg-white w-[25rem]">
                    <div className="flex items-center justify-between w-full pr-2 pl-4 py-3 border-b border-custom-drawerBorder">
                        <h2>Update expense</h2>
                        <IoClose size='25' onClick={() => setToggleUpdateOverlay({state:false, id:null})} className="cursor-pointer"/>
                    </div>
                    <form onSubmit={updateFormik.handleSubmit} className="w-[90%] flex flex-col gap-4 pb-8">
                        <div className="flex gap-2 flex-col w-full">
                            <label className="m-0">Description</label>
                            <input 
                                id="description"
                                type="text" 
                                placeholder="Enter description" 
                                className={`border ${updateFormik.touched.description && formik.errors.description ? 'border-red-500':'border-black'} outline-none rounded-md w-full h-10 pl-4`}
                                {...updateFormik.getFieldProps('description')}
                            />
                            {updateFormik.touched.description && updateFormik.errors.description && <div className="text-red-500 text-sm">{updateFormik.errors.description}</div>}
                        </div>
                        <div className="flex gap-2 flex-col w-full">
                            <label className="m-0">Category</label>
                            <select id="category" className={`border ${updateFormik.touched.categoryId && updateFormik.errors.categoryId ? 'border-red-500':'border-black'} rounded-md h-10`} {...updateFormik.getFieldProps('categoryId')}>
                                <option disabled selected>Select Category</option>
                                {categories.map(category => (
                                    <option value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            {updateFormik.touched.categoryId && updateFormik.errors.categoryId && <div className="text-red-500 text-sm">{updateFormik.errors.categoryId}</div>}
                        </div>
                        <div className="flex gap-2 flex-col w-full">
                            <label className="m-0">Amount</label>
                            <input 
                                type="number" 
                                placeholder="Enter amount" 
                                className={`border ${updateFormik.touched.amount && updateFormik.errors.amount ? 'border-red-500':'border-black'} outline-none rounded-md w-full h-10 pl-4`}
                                {...updateFormik.getFieldProps('amount')}
                            />
                            {updateFormik.touched.amount && updateFormik.errors.amount && <div className="text-red-500 text-sm">{updateFormik.errors.amount}</div>}
                        </div>
                        <div className="flex gap-2 flex-col w-full">
                            <label className="m-0">Date</label>
                            <input 
                                type="date" 
                                placeholder="Enter date" 
                                className={`border ${updateFormik.touched.date && updateFormik.errors.date ? 'border-red-500':'border-black'} outline-none rounded-md w-full h-10 pl-4`}
                                {...updateFormik.getFieldProps('date')}
                            />
                            {updateFormik.touched.date && updateFormik.errors.date && <div className="text-red-500 text-sm">{updateFormik.errors.date as string}</div>}
                        </div>
                        <button type='submit' className="flex items-center justify-center w-full h-10 bg-custom-black text-white rounded-md mt-8">{isLoading ? <ClipLoader size={20} color="white"/> : 'Submit'}</button>
                    </form>
                </div>
            </div>}
            <Drawer/>
            <div className="flex-1 flex flex-col items-center py-8 bg-[#f2f2f2]">
                <div className="flex gap-2 w-full pl-8">
                    <h1>Want to add a new expense?</h1>
                    <button className="hover:underline font-semibold" onClick={() => setToggleCreateOverlay(true)}>Click here</button>
                </div>
                <div className="w-[90%] h-[75vh] flex flex-col gap-6 mt-12">
                    <h1 className="text-2xl font-semibold">Expenses</h1>
                    <div className="flex flex-col w-full h-[95%] items-center">
                        <div className="flex items-center w-full justify-end gap-8">
                            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setToggleCategoryFilter(true)}>
                                <h2>Filter by category</h2>
                                <MdFilterAlt size={20} color="#222222"/>
                            </div>
                            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setToggleDateFilter(true)}>
                                <h2>Filter by date</h2>
                                <MdFilterAlt size={20} color="#222222"/>
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full py-4">
                            <h2 className="w-40 font-semibold">Description</h2>
                            <h2 className="w-40 font-semibold">Category</h2>
                            <h2 className="w-40 font-semibold">Amount</h2>
                            <h2 className="w-40 font-semibold">Date</h2>
                            <div className="opacity-0 flex gap-8 items-center">
                                <FiEdit size={17}/>
                                <MdOutlineDeleteOutline size={20}/>
                            </div>
                        </div>
                        <div className="w-full h-[90%] flex flex-col items-center overflow-y-auto">
                            {!isFetchingExpenses && expenses.map(expense => (
                            <div className="border-b border-black flex items-center justify-between w-full py-4">
                                <h2 className="w-40">{expense.description}</h2>
                                <h2 className="w-40">{expense.category.name}</h2>
                                <h2 className="w-40">{expense.amount}<sup>RWF</sup></h2>
                                <h2 className="w-40">{expense.date}</h2>
                                <div className="flex gap-8 items-center">
                                    <FiEdit size={17} onClick={() => setToggleUpdateOverlay({state:true, id: expense.id})}/>
                                    <MdOutlineDeleteOutline size={20} onClick={() => setToggleDeleteOverlay({state:true, id: expense.id})}/>    
                                </div>   
                            </div>
                            ))}
                            {isFetchingExpenses && <ClipLoader size={50} className="mt-12"/>}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Expenses;