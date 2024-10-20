import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchServiceById } from "../../redux/actions/serviceActions";
import { Link, useParams } from "react-router-dom";
import Drawer from "../../components/CDrawer";
import { IoClose, IoLocationSharp } from "react-icons/io5";
import { FaMoneyBillAlt } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { leaveReview } from "../../redux/actions/reviewActions";
import { resetStatus } from "../../redux/reviewSlice";
import { IoIosMail } from "react-icons/io";
import ChatPopup from "../chatpopup/ChatPopup"; // Import the chat popup here

const Service = () => {
    const { selectedService, fetching } = useAppSelector((state) => state.service);
    const { loading, status } = useAppSelector((state) => state.review);
    const { token } = useAppSelector((state) => state.auth);
    const [error, setError] = useState("");
    const [toggleLoginOverlay, setToggleLoginOverlay] = useState(false);
    const { reviews } = useAppSelector((state) => state.review);
    const dispatch = useAppDispatch();
    const { id } = useParams();
  
    useEffect(() => {
      dispatch(fetchServiceById(Number(id)));
    }, [reviews]);
  
    const [review, setReview] = useState<{
      rating: number | null;
      description: string;
      serviceId: number | undefined;
    }>({
      rating: null,
      description: "",
      serviceId: selectedService?.id,
    });
  
    const submitReview = async () => {
      if (!token) {
        setToggleLoginOverlay(true);
        return;
      }
  
      if (!review.rating) {
        setError("Rating is required");
        return;
      }
  
      if (!review.description) {
        setError("Description is required");
        return;
      }
  
      dispatch(
        leaveReview({
          rating: review.rating as number,
          description: review.description as string,
          serviceId: review.serviceId as number,
        })
      );
    };
  
    useEffect(() => {
      if (status === "successful") {
        setError("");
        dispatch(resetStatus());
      }
    }, [status]);
  
    return (
      <div className="w-full h-screen flex">
        {toggleLoginOverlay && (
          <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative flex flex-col w-[30rem] h-60 bg-white rounded-lg">
              <div className="w-full p-4 py-2 border-b border-greyLight text-xl">Error</div>
              <IoClose
                color="black"
                size="25"
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => setToggleLoginOverlay(false)}
              />
              <div className="flex flex-1 flex-col justify-between items-center p-4 pb-6">
                <p className="text-grey">
                  Only logged in users are allowed to submit service reviews.
                  Please login or create an account if you do not have one
                </p>
                <Link className="w-32 h-10 flex items-center justify-center rounded-md bg-custom-darkRed text-white" to="/login">
                  Go to login
                </Link>
              </div>
            </div>
          </div>
        )}
  
        <Drawer />
  
        <div className="flex-1 flex flex-col items-center py-8 bg-[#f2f2f2]">
          <div className="flex gap-2 w-full pl-8">
            <Link to={'/'} className="text-gray-500">Services</Link> &gt; {' '}
            <button className="hover:underline font-semibold">{selectedService?.name}</button>
          </div>
  
          <div className="w-[90%] h-[75vh] flex flex-col gap-6 mt-12">
            <div className="w-full flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-custom-textBlue">Service Details</h1>
            </div>
  
            {fetching && (
              <div className="flex justify-center items-center w-full mt-20">
                <ClipLoader color="#002839" size={50} />
              </div>
            )}
  
            {!fetching && selectedService && (
              <div className="w-full h-[90%] flex flex-col overflow-y-auto">
                <img src={selectedService.image} className="w-full h-[25rem] object-cover" alt="Service" />
                <h2 className="text-custom-textBlue text-2xl mt-12">
                  {selectedService.name} ({selectedService?.type})
                </h2>
                <p className="mt-4">{selectedService.description}</p>
  
                <div className="flex items-center gap-4 mt-12">
                  <IoIosMail size={20} />
                  <h2 className="text-lg">{selectedService.serviceProvider.email}</h2>
                </div>
  
                <div className="flex items-center gap-4 mt-4">
                  <IoLocationSharp size={20} />
                  <h2 className="text-lg">{selectedService.location}</h2>
                </div>
  
                <div className="flex items-center gap-4 mt-4">
                  <FaMoneyBillAlt size={20} />
                  <h2 className="text-lg">{selectedService.pricing}<sup>RWF</sup></h2>
                </div>
  
                <h2 className="text-custom-textBlue text-lg mt-4">
                  {selectedService?.availability ? 'Available' : 'Not available'}
                </h2>
  
                {selectedService.reviews.length !== 0 && (
                  <div className="flex w-full flex-col mt-12">
                    <h1 className="text-2xl text-custom-textBlue font-semibold">Reviews</h1>
                    <div className="flex flex-col gap-8 mt-8">
                      {selectedService.reviews.map((review) => (
                        <div key={review.id} className="flex flex-col gap-4 w-[65%] border-b border-gray-500 pb-2">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
                              <img src="/user.png" className="w-full h-full object-cover" alt="User" />
                            </div>
                            <h2>{review.user.email}</h2>
                          </div>
                          <p>{review.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
  
                <div className="flex w-full gap-4 flex-col items-start mt-12">
                  <h1 className="text-2xl font-semibold text-custom-textBlue">Leave a Review</h1>
                  <div className="flex flex-col w-full gap-4">
                    <textarea
                      placeholder="Write your review here..."
                      className="w-[65%] p-4 h-[10rem] resize-none border border-gray-500 rounded-md"
                      value={review.description}
                      onChange={(e) => setReview((prev) => ({ ...prev, description: e.target.value }))}
                    />
  
                    <div className="flex gap-2 w-full items-center">
                      <select
                        className="w-24 border border-gray-500 p-2 rounded-md"
                        value={review.rating || ""}
                        onChange={(e) => setReview((prev) => ({ ...prev, rating: Number(e.target.value) }))}
                      >
                        <option value="">Rating</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                      </select>
                      {loading ? (
                        <ClipLoader color="#002839" size={25} />
                      ) : (
                        <button className="h-10 px-6 rounded-md bg-custom-darkRed text-white" onClick={submitReview}>
                          Submit
                        </button>
                      )}
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
  
        {/* Chat Popup */}
        <ChatPopup />
      </div>
    );
  };
  
  export default Service;