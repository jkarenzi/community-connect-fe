import Drawer from "../../components/CDrawer";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {  fetchAllServices } from "../../redux/actions/serviceActions";
import { FaUser } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";


const Services = () => {
    const {services, fetching} = useAppSelector(state => state.service)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchAllServices())
    },[]) 
      
    return (
        <div className="w-full h-screen flex">
            <Drawer/>
            <div className="flex-1 flex flex-col items-center py-8 bg-[#f2f2f2]">
                <div className="w-[90%] h-[90vh] flex flex-col gap-6">
                    <h1 className="text-2xl font-semibold text-custom-textBlue">Services</h1>
                    <div className="w-full h-[90%] flex flex-wrap overflow-y-auto gap-6">    
                        {fetching && <div className="flex justify-center items-center w-full h-full">
                            <ClipLoader color="#002839" size={50}/>
                        </div>}
                        {!fetching && services.map(service => (
                            <div className="bg-white border border-[lightgray] flex flex-col rounded-lg w-[16rem] h-[16rem] overflow-hidden" onClick={() => navigate(`/consumer/services/${service.id}`)}>
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
 
export default Services;