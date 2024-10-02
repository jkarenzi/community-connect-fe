import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Drawer from "../components/Drawer";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../redux/actions/categoryActions";
import { categorySchema } from "../validationSchema/categorySchema";
import { Category } from "../types/Category";
import ClipLoader from 'react-spinners/ClipLoader'
import { resetStatus } from "../redux/categorySlice";

interface InitValues {
    name: string,
    limit: number | null
}

const Categories = () => {
    const [toggleDeleteOverlay, setToggleDeleteOverlay] = useState<{state:boolean, id:number|null, category:string}>({state:false, category:'', id:null})
    const [toggleCreateOverlay, setToggleCreateOverlay] = useState(false)
    const [toggleUpdateOverlay, setToggleUpdateOverlay] = useState<{state:boolean, id:number|null}>({state:false, id:null})
    const {categories, isLoading, isFetchingCategories, status} = useAppSelector(state => state.category)
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCategories())
    },[])

    useEffect(() => {
        if(status === 'successful'){
            console.log('accessed')
            setToggleCreateOverlay(false)
            setToggleUpdateOverlay({state:false,id:null})
            setToggleDeleteOverlay({state:false,id:null,category:''})
            dispatch(resetStatus())
        }
    },[status])

    useEffect(() => {
        if(toggleUpdateOverlay.state){
            setCurrentCategory(
                categories.find((category) => category.id === toggleUpdateOverlay.id)!
            )
        }else{
            setCurrentCategory(null)
        }
    },[toggleUpdateOverlay])

    const formik = useFormik({
        initialValues:{
            name:'',
            limit: null
        } as InitValues,
        onSubmit: (formData) => {
            dispatch(createCategory({
                ...formData,
                limit: formData.limit ? formData.limit : null
            }))
        },
        validationSchema: categorySchema
    })

    const updateFormik = useFormik({
        initialValues:{
            name:currentCategory?.name,
            limit: currentCategory?.limit
        } as InitValues,
        onSubmit: (formData) => {
            dispatch(updateCategory({
                id: toggleUpdateOverlay.id as number,     
                formData 
            }))
        },
        validationSchema: categorySchema,
        enableReinitialize: true
    })

    return (
        <div className="w-full h-screen flex">
            { toggleDeleteOverlay.state && <div className="fixed w-full h-screen flex items-center justify-center z-10 bg-black bg-opacity-50">
                <div className="flex flex-col items-center justify-between rounded-lg bg-white w-[30rem] h-48">
                    <div className="flex items-center w-full pl-4 py-3 border-b border-gray-400">
                        Delete category?
                    </div>
                    <div className="flex-1 flex flex-col w-full items-start justify-between py-6 px-4">
                        <h2 className="text-left m-0">This will also delete all expenses in the <span className="font-bold">{toggleDeleteOverlay.category}</span> category</h2>
                        <div className="w-full flex items-center justify-end gap-6">
                            <button className="w-20 h-10 flex items-center justify-center bg-transparent border border-black rounded-md" onClick={() => setToggleDeleteOverlay({state:false, category:'', id:null})}>Cancel</button>
                            <button className="w-20 h-10 flex items-center justify-center text-white bg-red-500 rounded-md" onClick={() => dispatch(deleteCategory(toggleDeleteOverlay.id as number))}>{isLoading ? <ClipLoader size={20} color="white"/> : 'Delete'}</button>
                        </div>
                    </div>
                </div>
            </div>}
            { toggleCreateOverlay && <div className="fixed w-full h-screen flex items-center justify-center z-10 bg-black bg-opacity-50">
                <div className="flex flex-col items-center justify-between rounded-lg bg-white w-[25rem]">
                    <div className="flex items-center justify-between w-full pr-2 pl-4 py-3 border-b border-custom-drawerBorder">
                        <h2>Create category</h2>
                        <IoClose size='25' onClick={() => {setToggleCreateOverlay(false); formik.resetForm()}} className="cursor-pointer"/>
                    </div>
                    <form onSubmit={formik.handleSubmit} className="w-[90%] flex flex-col gap-4 pb-8">
                        <div className="flex gap-2 flex-col w-full">
                            <label className="m-0">Name</label>
                            <input 
                                id="name"
                                type="text" 
                                placeholder="Enter category name" 
                                className={`border ${formik.touched.name && formik.errors.name ? 'border-red-500':'border-black'} outline-none rounded-md w-full h-10 pl-4`}
                                {...formik.getFieldProps('name')}
                            />
                            {formik.touched.name && formik.errors.name && <div className="text-red-500 text-sm">{formik.errors.name}</div>}
                        </div>
                        <div className="flex gap-2 flex-col w-full">
                            <label className="m-0">Limit</label>
                            <input
                                id="limit" 
                                type="number" 
                                placeholder="Enter category limit" 
                                className={`border ${formik.touched.limit && formik.errors.limit ? 'border-red-500':'border-black'} outline-none rounded-md w-full h-10 pl-4`}
                                {...formik.getFieldProps('limit')}
                            />
                            {formik.touched.limit && formik.errors.limit && <div className="text-red-500 text-sm">{formik.errors.limit}</div>}
                        </div>
                        <button type='submit' className="flex items-center justify-center w-full h-10 bg-custom-black text-white rounded-md mt-8">{isLoading ? <ClipLoader size={20} color="white"/> : 'Submit'}</button>
                    </form>
                </div>
            </div>}
            { toggleUpdateOverlay.state && <div className="fixed w-full h-screen flex items-center justify-center z-10 bg-black bg-opacity-50">
                <div className="flex flex-col items-center justify-between rounded-lg bg-white w-[25rem]">
                    <div className="flex items-center justify-between w-full pr-2 pl-4 py-3 border-b border-custom-drawerBorder">
                        <h2>Update category</h2>
                        <IoClose size='25' onClick={() => setToggleUpdateOverlay({state:false, id:null})} className="cursor-pointer"/>
                    </div>
                    <form onSubmit={updateFormik.handleSubmit} className="w-[90%] flex flex-col gap-4 pb-8">
                        <div className="flex gap-2 flex-col w-full">
                            <label className="m-0">Name</label>
                            <input 
                                id="name"
                                type="text" 
                                placeholder="Enter category name" 
                                className={`border ${updateFormik.touched.name && updateFormik.errors.name ? 'border-red-500':'border-black'} outline-none rounded-md w-full h-10 pl-4`}
                                {...updateFormik.getFieldProps('name')}
                            />
                            {updateFormik.touched.name && updateFormik.errors.name && <div className="text-red-500 text-sm">{updateFormik.errors.name}</div>}
                        </div>
                        <div className="flex gap-2 flex-col w-full">
                            <label className="m-0">Limit</label>
                            <input
                                id="limit" 
                                type="number" 
                                placeholder="Enter category limit" 
                                className={`border ${updateFormik.touched.limit && updateFormik.errors.limit ? 'border-red-500':'border-black'} outline-none rounded-md w-full h-10 pl-4`}
                                {...updateFormik.getFieldProps('limit')}
                            />
                            {updateFormik.touched.limit && updateFormik.errors.limit && <div className="text-red-500 text-sm">{updateFormik.errors.limit}</div>}
                        </div>
                        <button type='submit' className="flex items-center justify-center w-full h-10 bg-custom-black text-white rounded-md mt-8">{isLoading ? <ClipLoader size={20} color="white"/> : 'Submit'}</button>
                    </form>
                </div>
            </div>}
            <Drawer/>
            <div className="flex-1 flex flex-col items-center py-8 bg-[#f2f2f2]">
                <div className="flex gap-2 w-full pl-8">
                    <h1>Want to add a new category?</h1>
                    <button className="hover:underline font-semibold" onClick={() => setToggleCreateOverlay(true)}>Click here</button>
                </div>
                <div className="w-[90%] h-[75vh] flex flex-col gap-6 mt-12">
                    <h1 className="text-2xl font-semibold">Categories</h1>
                    <div className="flex flex-col w-full items-center h-[95%]">
                        <div className="flex items-center justify-between w-full py-4">
                            <h2 className="w-40 font-semibold">Name</h2>
                            <h2 className="w-40 font-semibold">Total Expenses</h2>
                            <h2 className="w-40 font-semibold">Limit</h2>
                            <div className="opacity-0 flex gap-8 items-center">
                                <FiEdit size={17}/>
                                <MdOutlineDeleteOutline size={20}/>    
                            </div>   
                        </div>
                        <div className="w-full h-[90%] flex flex-col items-center overflow-y-auto">
                            {!isFetchingCategories && categories.map(category => (
                            <div className="border-b border-black flex items-center justify-between w-full py-4">
                                <h2 className="w-40">{category.name}</h2>
                                <h2 className="w-40">{category.totalExpenses}<sup>RWF</sup></h2>
                                {category.limit ? <h2 className="w-40">{category.limit}<sup>RWF</sup></h2> : <h2 className="w-40">---</h2>}
                                <div className="flex gap-8 items-center">
                                    <FiEdit size={17} onClick={() => setToggleUpdateOverlay({state:true, id:category.id})}/>
                                    <MdOutlineDeleteOutline size={20} onClick={() => setToggleDeleteOverlay({state:true, category:category.name, id:category.id})}/>    
                                </div>
                            </div>
                            ))}
                            {isFetchingCategories && <ClipLoader size={50} className="mt-12"/>}
                        </div>       
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Categories;