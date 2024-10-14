import { Link, useNavigate } from "react-router-dom";
import {useFormik} from 'formik'
import { authSchema } from "../validationSchema/authSchema";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login } from "../redux/actions/authActions";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { resetLoginStatus } from "../redux/authSlice";

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {isLoggingIn, user, loginStatus} = useAppSelector(state => state.auth)
    const formik = useFormik({
        initialValues:{
            email: '',
            password: ''
        },
        onSubmit: (formData) => {
            dispatch(login(formData))
        },
        validationSchema: authSchema
    })

    useEffect(() => {
        if(loginStatus === 'successful'){
            dispatch(resetLoginStatus())
            if(user!.role === 'consumer'){
                navigate('/consumer/services')
            }else{
                navigate('/serviceprovider/services')        
            }
        }
    },[loginStatus])

    return (
        <div className="w-full h-screen flex items-center justify-center bg-white">
            <form onSubmit={formik.handleSubmit} className="flex flex-col rounded-lg w-[25rem] py-8 items-center gap-8 bg-white shadow-all-sides">
                <h1 className="text-3xl font-semibold text-custom-textBlue">Login</h1>
                <div className="flex flex-col gap-2 w-[90%]">
                    <label className="m-0">Email</label>
                    <input 
                        id="email"
                        type="email" 
                        placeholder="Enter your email here" 
                        className={`border ${formik.touched.email && formik.errors.email ? 'border-red-500': 'border-black'} outline-none rounded-md w-full h-10 pl-2`}
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email && <div className="text-red-500 text-sm">{formik.errors.email}</div>}
                </div>
                <div className="flex flex-col gap-2 w-[90%]">
                    <label className="m-0">Password</label>
                    <input 
                        id="password"
                        type="password" 
                        placeholder="Enter your password here"
                        className={`border ${formik.touched.password && formik.errors.password ? 'border-red-500': 'border-black'} outline-none rounded-md w-full h-10 pl-2`}
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password && <div className="text-red-500 text-sm">{formik.errors.password}</div>}
                </div>
                <button type='submit' className='flex items-center justify-center w-[90%] h-10 bg-custom-darkRed text-white rounded-md mt-4'>{isLoggingIn? <ClipLoader size={25} color="white"/> : 'Login'}</button>
                <h2 className="">Dont have an account? <Link className="hover:underline" to="/signup">Signup</Link></h2>
            </form>
        </div>
    );
}
 
export default Login;