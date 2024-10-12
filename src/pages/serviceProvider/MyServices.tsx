import { useFormik } from "formik";
import Drawer from "../../components/SPDrawer";
import { serviceSchema } from "../../validationSchema/serviceSchema";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import ClipLoader from "react-spinners/ClipLoader";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createService, fetchOwnServices } from "../../redux/actions/serviceActions";
import { FaUser } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const MyServices = () => {
    const [toggleCreateOverlay, setToggleCreateOverlay] = useState(false)
    const {loading, status, ownServices, fetching} = useAppSelector(state => state.service)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
          type: '',
          location: '',
          availability: false,
          pricing: '',
          name: '',
          description: '',
        },
        validationSchema: serviceSchema,
        onSubmit: (formData) => {
          dispatch(createService({
            ...formData,
            pricing: Number(formData.pricing)
          }))
        },
      });

      const handleAvailabilityChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value === 'available'){
            formik.setFieldValue('availability', true)
        }else if(e.target.value === 'notAvailable'){
            formik.setFieldValue('availability', false)
        }
      }

      useEffect(() => {
        if(status === 'successful'){
            setToggleCreateOverlay(false)
        }
      },[status])

      useEffect(() => {
        dispatch(fetchOwnServices())
      },[]) 
    return (
        <div className="w-full h-screen flex">
            { toggleCreateOverlay && <div className="fixed w-full h-screen flex items-center justify-center z-10 bg-black bg-opacity-50">
                <div className="flex flex-col items-center justify-between rounded-lg bg-white w-[45rem]">
                    <div className="flex items-center justify-between w-full pr-2 pl-4 py-3 border-b border-custom-drawerBorder">
                        <h2>Create Service</h2>
                        <IoClose size='25' onClick={() => {setToggleCreateOverlay(false); formik.resetForm()}} className="cursor-pointer"/>
                    </div>
                    <form onSubmit={formik.handleSubmit} className="w-[90%] flex flex-col pb-8 mt-4">
                        <div className="flex w-full justify-between">
                            <div className="flex flex-col gap-4 w-[45%]">
                                <div className="flex gap-2 flex-col w-full">
                                    <label className="m-0">Name</label>
                                    <input 
                                        id="name"
                                        type="text" 
                                        placeholder="Enter service name" 
                                        className={`border ${formik.touched.name && formik.errors.name ? 'border-red-500':'border-black'} outline-none rounded-md w-full h-10 pl-4`}
                                        {...formik.getFieldProps('name')}
                                    />
                                    {formik.touched.name && formik.errors.name && <div className="text-red-500 text-sm">{formik.errors.name}</div>}
                                </div>
                                <div className="flex gap-2 flex-col w-full">
                                    <label className="m-0">Description</label>
                                    <input 
                                        id="description"
                                        type="text" 
                                        placeholder="Enter service description" 
                                        className={`border ${formik.touched.description && formik.errors.description ? 'border-red-500':'border-black'} outline-none rounded-md w-full h-10 pl-4`}
                                        {...formik.getFieldProps('description')}
                                    />
                                    {formik.touched.description && formik.errors.description && <div className="text-red-500 text-sm">{formik.errors.description}</div>}
                                </div>
                                <div className="flex gap-2 flex-col w-full">
                                    <label className="m-0">Type</label>
                                    <input 
                                        id="type"
                                        type="text" 
                                        placeholder="Enter service type" 
                                        className={`border ${formik.touched.type && formik.errors.type ? 'border-red-500':'border-black'} outline-none rounded-md w-full h-10 pl-4`}
                                        {...formik.getFieldProps('type')}
                                    />
                                    {formik.touched.type && formik.errors.type && <div className="text-red-500 text-sm">{formik.errors.type}</div>}
                                </div>
                                <div className="flex gap-2 flex-col w-full">
                                    <label className="m-0">Location</label>
                                    <input 
                                        id="location"
                                        type="text" 
                                        placeholder="Enter service location" 
                                        className={`border ${formik.touched.location && formik.errors.location ? 'border-red-500':'border-black'} outline-none rounded-md w-full h-10 pl-4`}
                                        {...formik.getFieldProps('location')}
                                    />
                                    {formik.touched.location && formik.errors.location && <div className="text-red-500 text-sm">{formik.errors.location}</div>}
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 w-[45%]">
                                <div className="flex gap-2 flex-col w-full">
                                    <label className="m-0">Pricing</label>
                                    <input 
                                        id="pricing"
                                        type="number" 
                                        placeholder="Enter service price" 
                                        className={`border ${formik.touched.pricing && formik.errors.pricing ? 'border-red-500':'border-black'} outline-none rounded-md w-full h-10 pl-4`}
                                        {...formik.getFieldProps('pricing')}
                                    />
                                    {formik.touched.pricing && formik.errors.pricing && <div className="text-red-500 text-sm">{formik.errors.pricing}</div>}
                                </div>
                                <div className="flex flex-col gap-2 w-[90%]">
                                    <label className="m-0">Availability</label>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="radio" 
                                                id="role" 
                                                value="available"
                                                onChange={handleAvailabilityChange}
                                                checked={formik.values.availability === true}
                                            />
                                            <label>Available</label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <input 
                                                type="radio" 
                                                id="availability" 
                                                value="notAvailable"
                                                onChange={handleAvailabilityChange}
                                                checked={formik.values.availability === false}
                                            />
                                            <label>Not available</label>
                                        </div>
                                    </div>
                                    {formik.touched.availability && formik.errors.availability && <div className="text-red-500 text-sm">{formik.errors.availability}</div>}
                                </div>
                            </div>   
                        </div>
                        <button type='submit' className="flex items-center justify-center w-full h-10 bg-custom-darkRed text-white rounded-md mt-8">{loading ? <ClipLoader size={20} color="white"/> : 'Submit'}</button>
                    </form>
                </div>
            </div>}
            <Drawer/>
            <div className="flex-1 flex flex-col items-center py-8 bg-[#f2f2f2]">
                <div className="flex gap-2 w-full pl-8">
                    <h1>Want to add a new service?</h1>
                    <button className="hover:underline font-semibold text-custom-darkRed" onClick={() => setToggleCreateOverlay(true)}>Click here</button>
                </div>
                <div className="w-[90%] h-[75vh] flex flex-col gap-6 mt-12">
                    <h1 className="text-2xl font-semibold text-custom-textBlue">My Services</h1>
                    <div className="w-full h-[90%] flex flex-wrap overflow-y-auto gap-6">
                        {fetching && <div className="flex justify-center items-center w-full h-full">
                            <ClipLoader color="#002839" size={50}/>
                        </div>}
                        {!fetching && ownServices.map(service => (
                            <div className="bg-white border border-[lightgray] flex flex-col rounded-lg w-[16rem] h-[16rem] overflow-hidden" onClick={() => navigate(`/serviceprovider/services/${service.id}`)}>
                                <div className="w-full h-[60%]">
                                    <img src="https://th.bing.com/th/id/R.130a0dc916cf8a9f91dc201f625069e1?rik=NU6fSJNRMTk7fg&pid=ImgRaw&r=0" className="w-full h-full object-cover"/>
                                </div>
                                <div className="flex-1 flex flex-col justify-between px-2 pb-2">
                                    <h2 className="text-custom-textBlue text-lg">{service.name}</h2>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-3">
                                            <FaUser size={13} color='black'/>
                                            <h2 className="text-sm">{service.serviceProvider.email}</h2>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaMoneyBillAlt size={13} color="black"/>
                                            <h2 className="text-sm">{service.pricing}<sup>RWF</sup></h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default MyServices;