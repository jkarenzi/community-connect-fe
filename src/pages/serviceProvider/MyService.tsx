import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteService, fetchServiceById, updateService } from "../../redux/actions/serviceActions";
import { Link, useNavigate, useParams } from "react-router-dom";
import Drawer from "../../components/SPDrawer";
import { IoClose, IoLocationSharp } from "react-icons/io5";
import { FaMoneyBillAlt } from "react-icons/fa";
import { useFormik } from "formik";
import ClipLoader from "react-spinners/ClipLoader";
import { serviceSchema } from "../../validationSchema/serviceSchema";
import { resetStatus } from "../../redux/serviceSlice";


const MyService = () => {
    const [toggleUpdateOverlay, setToggleUpdateOverlay] = useState(false)
    const {selectedService, loading, status, deleteStatus, fetching} = useAppSelector(state => state.service)
    const [toggleDeleteOverlay, setToggleDeleteOverlay] = useState({state:false, name:''})
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    
    const formik = useFormik({
        initialValues: {
          type: selectedService?.type,
          location: selectedService?.location,
          availability: selectedService?.availability,
          pricing: selectedService?.pricing,
          name: selectedService?.name,
          description: selectedService?.description,
        },
        validationSchema: serviceSchema,
        onSubmit: (formData) => {
          dispatch(updateService({
            id: Number(selectedService?.id),
            formData: {
                ...formData,
                pricing: Number(formData.pricing)
            }
          }))
        },
        enableReinitialize:true
      });


      useEffect(() => {
        dispatch(fetchServiceById(Number(id)))
      },[]) 

      useEffect(() => {
        if(status === 'successful'){
            setToggleUpdateOverlay(false)
            dispatch(resetStatus())
        }
      },[status])

      useEffect(() => {
        if(deleteStatus === 'successful'){
            setToggleDeleteOverlay({state:false, name:''})
            navigate('/serviceprovider/services')
            dispatch(resetStatus())
        }
      },[deleteStatus])



      const handleAvailabilityChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value === 'available'){
            formik.setFieldValue('availability', true)
        }else if(e.target.value === 'notAvailable'){
            formik.setFieldValue('availability', false)
        }
      }
    return (
        <div className="w-full h-screen flex">
             { toggleDeleteOverlay.state && <div className="fixed w-full h-screen flex items-center justify-center z-10 bg-black bg-opacity-50">
                <div className="flex flex-col items-center justify-between rounded-lg bg-white w-[30rem] h-48">
                    <div className="flex items-center w-full pl-4 py-3 border-b border-gray-400">
                        Delete category?
                    </div>
                    <div className="flex-1 flex flex-col w-full items-start justify-between py-6 px-4">
                        <h2 className="text-left m-0">This will delete the <span className="font-bold">{toggleDeleteOverlay.name}</span> service</h2>
                        <div className="w-full flex items-center justify-end gap-6">
                            <button className="w-20 h-10 flex items-center justify-center bg-transparent border border-black rounded-md" onClick={() => setToggleDeleteOverlay({state:false, name:''})}>Cancel</button>
                            <button className="w-20 h-10 flex items-center justify-center text-white bg-red-500 rounded-md" onClick={() => dispatch(deleteService(Number(selectedService?.id)))}>{loading ? <ClipLoader size={20} color="white"/> : 'Delete'}</button>
                        </div>
                    </div>
                </div>
            </div>}
            { toggleUpdateOverlay && <div className="fixed w-full h-screen flex items-center justify-center z-10 bg-black bg-opacity-50">
                <div className="flex flex-col items-center justify-between rounded-lg bg-white w-[45rem]">
                    <div className="flex items-center justify-between w-full pr-2 pl-4 py-3 border-b border-custom-drawerBorder">
                        <h2>Update Service</h2>
                        <IoClose size='25' onClick={() => {setToggleUpdateOverlay(false); formik.resetForm()}} className="cursor-pointer"/>
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
                    <Link to={'/serviceprovider/services'} className="text-gray-500">Services</Link> &gt; {' '}
                    <button className="hover:underline font-semibold">{selectedService?.name}</button>
                </div>
                <div className="w-[90%] h-[75vh] flex flex-col gap-6 mt-12">
                    <div className="w-full flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-custom-textBlue">Service Details</h1>
                        {selectedService && <div className="flex items-center gap-6">
                            <h2 className="text-custom-textBlue hover:underline cursor-pointer" onClick={() => setToggleUpdateOverlay(true)}>Edit</h2>
                            <h2 className="text-custom-darkRed hover:underline cursor-pointer" onClick={() => setToggleDeleteOverlay({state:true, name:selectedService!.name})}>Delete</h2>
                        </div>}
                    </div>
                    {fetching && <div className="flex justify-center items-center w-full mt-20">
                        <ClipLoader color="#002839" size={50}/>
                    </div>}               
                    {!fetching && selectedService && <div className="w-full h-[90%] flex flex-col overflow-y-auto">
                        <img src={selectedService.image} className="w-full h-[25rem] object-cover"/>
                        <h2 className="text-custom-textBlue text-2xl mt-12">{selectedService?.name} ({selectedService?.type})</h2>
                        <p className="mt-4">{selectedService?.description}</p>
                        <div className="flex items-center gap-4 mt-12">
                            <IoLocationSharp size={20}/>
                            <h2 className="text-lg">{selectedService?.location}</h2>
                        </div>
                        <div className="flex items-center gap-4 mt-4">
                            <FaMoneyBillAlt size={20}/>
                            <h2 className="text-lg">{selectedService?.pricing}<sup>RWF</sup></h2>
                        </div>
                        <h2 className="text-custom-textBlue text-lg mt-4">{selectedService?.availability ? 'Available':'Not available'}</h2>
                        {selectedService.reviews.length !== 0 && <div className="flex w-full flex-col mt-12">
                            <h1 className="text-2xl text-custom-textBlue font-semibold">Reviews</h1>
                            <div className="flex flex-col gap-8 mt-8">
                                {selectedService.reviews.map(review => (
                                    <div className="flex flex-col gap-4 w-[65%] border-b border-gray-500 pb-2">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
                                                <img src="/user.png" className="w-full h-full object-cover"/>
                                            </div>
                                            <h2>{review.user.email}</h2>
                                        </div>
                                        <p>{review.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>}
                    </div>}
                </div>
            </div>
        </div>
    );
}
 
export default MyService;