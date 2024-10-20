  // import React, { useState } from "react";
  // import { motion } from "framer-motion";
  // import { format, addMonths, subMonths, endOfMonth, eachDayOfInterval, isSameMonth } from 'date-fns';
  
  // const BookingCalendar: React.FC = () => {
  //   const [currentMonth, setCurrentMonth] = useState(new Date());
  //   const [checkInDate, setCheckInDate] = useState<string | null>(null);
  //   const [checkOutDate, setCheckOutDate] = useState<string | null>(null);
  //   const [checkInTime, setCheckInTime] = useState<string | null>(null); // Dynamic Check-in time
  //   const [checkOutTime, setCheckOutTime] = useState<string | null>(null); // Dynamic Check-out time
  //   const [guestCount, setGuestCount] = useState<number>(1);
  //   //const nightlyRate = 178;
  
  //   const handleCheckInDateSelect = (date: string) => {
  //     setCheckInDate(date);
  //     // Automatically set check-out date to the next day if not already set or if the selected check-out is before the check-in date
  //     if (!checkOutDate || (checkOutDate && new Date(checkOutDate) <= new Date(date))) {
  //       setCheckOutDate(format(new Date(date).setDate(new Date(date).getDate() + 1), "yyyy-MM-dd"));
  //     }
  //   };
  
  //   // const handleCheckOutDateSelect = (date: string) => {
  //   //   if (checkInDate && new Date(date) > new Date(checkInDate)) {
  //   //     setCheckOutDate(date);
  //   //   } else {
  //   //     alert("Check-out date must be after the check-in date.");
  //   //   }
  //   // };
  
  //   const handleNextMonth = () => {
  //     setCurrentMonth(addMonths(currentMonth, 1));
  //   };
  
  //   const handlePreviousMonth = () => {
  //     setCurrentMonth(subMonths(currentMonth, 1));
  //   };
  
  //   const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>, type: "checkIn" | "checkOut") => {
  //     if (type === "checkIn") setCheckInTime(e.target.value);
  //     if (type === "checkOut") setCheckOutTime(e.target.value);
  //   };
  
  //   const handleGuestChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     setGuestCount(parseInt(e.target.value));
  //   };
  
  //   const handleBooking = () => {
  //     if (checkInDate && checkOutDate && checkInTime && checkOutTime) {
  //       alert(`You have booked from ${checkInDate} (${checkInTime}) to ${checkOutDate} (${checkOutTime})`);
  //     } else {
  //       alert("Please select check-in and check-out dates and times.");
  //     }
  //   };
  
  //   const getDaysInMonth = () => {
  //     const start = startOfMonth(currentMonth);
  //     const end = endOfMonth(currentMonth);
  //     return eachDayOfInterval({ start, end });
  //   };
  
  //   const getNumberOfNights = () => {
  //     if (checkInDate && checkOutDate) {
  //       return (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 3600 * 24);
  //     }
  //     return 0;
  //   };
  
  //   const totalNights = getNumberOfNights();
  //   //const totalPrice = totalNights * nightlyRate;
  
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
  //       <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-5xl flex flex-col lg:flex-row gap-6">
  //         {/* Calendar Section */}
  //         <div className="flex-1">
  //           <h2 className="text-2xl font-semibold mb-4">Select Dates</h2>
  
  //           <div className="flex justify-between items-center mb-4">
  //             <button onClick={handlePreviousMonth} className="bg-gray-200 p-2 rounded-lg">&lt; Previous</button>
  //             <span className="text-lg font-medium">{format(currentMonth, "MMMM yyyy")}</span>
  //             <button onClick={handleNextMonth} className="bg-gray-200 p-2 rounded-lg">Next &gt;</button>
  //           </div>
  
  //           <div className="grid grid-cols-7 gap-2 mb-4">
  //             {/* Days of the week */}
  //             {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
  //               <div key={day} className="font-bold text-center">{day}</div>
  //             ))}
  
  //             {/* Calendar Days */}
  //             {getDaysInMonth().map((date:Date) => {
  //               const dateString = format(date, "yyyy-MM-dd");
  //               const isCheckIn = checkInDate === dateString;
  //               const isCheckOut = checkOutDate === dateString;
  
  //               return (
  //                 <motion.div
  //                   key={dateString}
  //                   className={`p-3 text-center rounded-lg cursor-pointer ${
  //                     !isSameMonth(date, currentMonth)
  //                       ? "text-gray-400"  // Grayed out for days from other months
  //                       : isCheckIn
  //                       ? "bg-green-500 text-white"
  //                       : isCheckOut
  //                       ? "bg-red-500 text-white"
  //                       : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
  //                   }`}
  //                   onClick={() => handleCheckInDateSelect(dateString)}
  //                 >
  //                   {format(date, "d")}
  //                 </motion.div>
  //               );
  //             })}
  //           </div>
  
  //           <div className="text-sm text-gray-600 mt-4">
  //             <p className="mb-2">
  //               <strong>Note:</strong> You can choose any available date, and the system will calculate the services fees  automatically.
  //             </p>
  //           </div>
  //         </div>
  
  //         {/* Booking Section */}
  //         <div className="bg-gray-50 p-6 rounded-lg shadow-lg w-full max-w-sm">
  //           <h2 className="text-2xl font-semibold mb-4">Add times for appointment</h2>
  
  //           <div className="mb-4">
  //             <label htmlFor="check-in" className="block text-sm font-medium text-gray-700">
  //               Check In
  //             </label>
  //             <input
  //               type="text"
  //               id="check-in"
  //               value={checkInDate ? format(new Date(checkInDate), 'MMM dd, yyyy') : ""}
  //               placeholder="Select a date"
  //               className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
  //               readOnly
  //             />
  //           </div>
  
  //           <div className="mb-4">
  //             <label htmlFor="check-in-time" className="block text-sm font-medium text-gray-700">
  //               Check In Time
  //             </label>
  //             <input
  //               type="time"
  //               id="check-in-time"
  //               value={checkInTime || ""}
  //               onChange={(e) => handleTimeChange(e, "checkIn")}
  //               className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
  //             />
  //           </div>
  
  //           <div className="mb-4">
  //             <label htmlFor="check-out" className="block text-sm font-medium text-gray-700">
  //               Check Out
  //             </label>
  //             <input
  //               type="text"
  //               id="check-out"
  //               value={checkOutDate ? format(new Date(checkOutDate), 'MMM dd, yyyy') : ""}
  //               placeholder="Select a date"
  //               className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
  //               readOnly
  //             />
  //           </div>
  
  //           <div className="mb-4">
  //             <label htmlFor="check-out-time" className="block text-sm font-medium text-gray-700">
  //               Check Out Time
  //             </label>
  //             <input
  //               type="time"
  //               id="check-out-time"
  //               value={checkOutTime || ""}
  //               onChange={(e) => handleTimeChange(e, "checkOut")}
  //               className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
  //             />
  //           </div>
  
  //           <div className="mb-4">
  //             <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
  //               services
  //             </label>
  //             <select
  //               id="guests"
  //               value={guestCount}
  //               onChange={handleGuestChange}
  //               className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
  //             >
  //               <option value={1}>Business Patrner </option>
  //               <option value={2}>workshops</option>
  //               <option value={3}>video conference</option>
  //               <option value={4}>events</option>
  //             </select>
  //           </div>
  
  //          {/* <div className="mb-4">
  //             <label htmlFor="coupon" className="block text-sm font-medium text-gray-700">
  //               Discount Coupon
  //             </label>
  //             <input
  //               type="text"
  //               id="coupon"
  //               value={coupon}
  //               onChange={(e) => setCoupon(e.target.value)}
  //               placeholder="Enter coupon code"
  //               className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
  //             />
  //           </div>  */}
  
  //           {/* Pricing Section 
  //           <div className="mb-4 border-t border-gray-300 pt-4">
  //             <div className="flex justify-between mb-2">
  //               <span>${nightlyRate} x {totalNights} night{totalNights > 1 ? 's' : ''}</span>
  //               <span>${totalPrice}</span>
  //             </div>
  //             <div className="flex justify-between mb-2">
  //               <span>Service Fee</span>
  //               <span>$0</span>
  //             </div>
  //             <div className="flex justify-between font-semibold">
  //               <span>Total</span>
  //               <span>${totalPrice}</span>
  //             </div>
  //           </div>  */}
  
  //           {/* Booking Button */}
  //           <button
  //             onClick={handleBooking}
  //             className="w-full bg-custom-darkRed text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
  //           >
  //             Book Service Now
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };
  
  // export default BookingCalendar;
   