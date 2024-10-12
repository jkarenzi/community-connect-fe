import { Link, useNavigate } from "react-router-dom";
import { signUpSchema } from "../validationSchema/authSchema";
import { useFormik } from "formik";
import { signUp } from "../redux/actions/authActions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { resetSignUpStatus } from "../redux/authSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { successToast } from "../services/toast";


const SignUp = () => {
    const navigate = useNavigate()
    const {signUpStatus, isSigningUp} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues:{
            email: '',
            password: '',
            role:''
        },
        onSubmit: (formData) => {
            dispatch(signUp(formData))
        },
        validationSchema: signUpSchema
    })

    useEffect(() => {
        if(signUpStatus === 'successful'){
            navigate('/login')
            successToast('Signup successful')
            dispatch(resetSignUpStatus())
        }
    },[signUpStatus])

    useEffect(() => {
        console.log(formik.values)
    },[formik.values])


    return (
        <div className="w-full h-screen flex items-center justify-center bg-white">
            <form onSubmit={formik.handleSubmit} className="flex flex-col rounded-lg w-[25rem] py-8 items-center gap-8 bg-white shadow-all-sides">
                <h1 className="text-3xl font-semibold text-custom-textBlue">Sign up</h1>
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
                <div className="flex flex-col gap-2 w-[90%]">
                    <label className="m-0">Sign up as</label>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <input 
                                type="radio" 
                                id="role" 
                                value="consumer" 
                                onChange={formik.handleChange('role')}
                                checked={formik.values.role === 'consumer'}
                            />
                            <label>Consumer</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input 
                                type="radio" 
                                id="role" 
                                value="serviceProvider" 
                                onChange={formik.handleChange('role')}
                                checked={formik.values.role === 'serviceProvider'}
                            />
                            <label>Service Provider</label>
                        </div>
                    </div>
                    {formik.touched.role && formik.errors.role && <div className="text-red-500 text-sm">{formik.errors.role}</div>}
                </div>
                <button type='submit' className="flex items-center justify-center w-[90%] h-10 bg-custom-darkRed text-white rounded-md mt-4">{isSigningUp? <ClipLoader size={25} color="white"/> : 'Sign up'}</button>
                <h2 className="">Already have an account? <Link className="hover:underline" to="/login">Login</Link></h2>
            </form>
        </div>
    );
}
 
export default SignUp;