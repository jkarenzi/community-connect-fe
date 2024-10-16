import React, { useState } from "react";
import { motion } from "framer-motion";
import { format } from 'date-fns';

const BookingCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [coupon, setCoupon] = useState<string>("");
  const nightlyRate = 178;
  
  // Sample available dates for demonstration purposes (assume some dates are unavailable)
  const availableDates = ["2020-05-04", "2020-05-05", "2020-05-11", "2020-05-15", "2020-05-20", "2020-05-22", "2020-05-30"];
  
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleBooking = () => {
    if (selectedDate) {
      alert(`You have booked an appointment on ${selectedDate}`);
    } else {
      alert("Please select a date.");
    }
  };

  const handleGuestChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGuestCount(parseInt(e.target.value));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-5xl flex flex-col lg:flex-row gap-6">
        {/* Calendar Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Availability</h2>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {/* Calendar Grid */}
            {Array.from({ length: 31 }, (_, i) => {
              const date = `2020-05-${String(i + 1).padStart(2, '0')}`;
              const isAvailable = availableDates.includes(date);
              return (
                <motion.div
                  key={i}
                  className={`p-3 text-center rounded-lg cursor-pointer ${
                    isAvailable
                      ? selectedDate === date
                        ? "bg-indigo-500 text-white"
                        : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={() => isAvailable && handleDateSelect(date)}
                >
                  {i + 1}
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-between items-center mb-4">
            <button className="bg-gray-200 p-2 rounded-lg">&lt; April 2020</button>
            <button className="bg-gray-200 p-2 rounded-lg">June 2020 &gt;</button>
          </div>

          <div className="text-sm text-gray-600 mt-4">
            <p className="mb-2">
              <strong>Pack your umbrella:</strong> Weather forecast predicts light showers around this time of year.
            </p>
            <p className="mb-2">
              <strong>Drive slow and safe:</strong> The roads around this area have witnessed 100+ accidents in the last 5 years.
            </p>
            <p>
              <strong>You will be in good hands:</strong> This restaurant has won 8 awards for hospitality in recent years.
            </p>
          </div>
        </div>

        {/* Booking Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-4">Add dates for exact pricing</h2>
          <div className="mb-4">
            <label htmlFor="check-in" className="block text-sm font-medium text-gray-700">
              Check In
            </label>
            <input
              type="text"
              id="check-in"
              value={selectedDate ? format(new Date(selectedDate), 'MMM dd, yyyy') : ""}
              placeholder="Select a date"
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700">
              Guests
            </label>
            <select
              id="guests"
              value={guestCount}
              onChange={handleGuestChange}
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
            >
              <option value={1}>1 guest</option>
              <option value={2}>2 guests</option>
              <option value={3}>3 guests</option>
              <option value={4}>4 guests</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="coupon" className="block text-sm font-medium text-gray-700">
              Discount Coupon
            </label>
            <input
              type="text"
              id="coupon"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter coupon code"
              className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
            />
          </div>

          {/* Pricing Section */}
          <div className="mb-4 border-t border-gray-300 pt-4">
            <div className="flex justify-between mb-2">
              <span>${nightlyRate} x 1 night</span>
              <span>${nightlyRate}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Service Fee</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${nightlyRate}</span>
            </div>
          </div>

          {/* Booking Button */}
          <button
            onClick={handleBooking}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Book Suite Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
