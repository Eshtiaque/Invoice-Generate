import React from "react";
import { useLocation } from "react-router-dom";
import img from '../assets/nyntax.png'

const Invoice = () => {
  const location = useLocation();
  const invoiceData = location.state.invoiceData;
  const {
    reservationID,
    pickupDate,
    returnDate,
    duration,
    discount,
    firstName,
    lastName,
    email,
    phone,
    collisionDamageWaiver,
    liabilityInsurance,
    rentalTax,
    vehicleType,
    vehicle,
    total,
    carDetails,
  } = invoiceData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-8 ">
        <div className="flex">
          <div>
            <img className="h-12 w-12 mt-1 me-2 rounded-lg" src={img} alt="" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Invoice</h1>
            <p className="text-sm text-gray-600 ">Reservation ID: {reservationID}</p>
          </div>
        </div>

        <button onClick={handlePrint} className=" px-2 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none">
          Print Invoice
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Customer Details</h2>
          <p className="text-sm text-gray-600"><strong>Name:</strong> {firstName} {lastName}</p>
          <p className="text-sm text-gray-600"><strong>Email:</strong> {email}</p>
          <p className="text-sm text-gray-600"><strong>Phone:</strong> {phone}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Reservation Details</h2>
          <p className="text-sm text-gray-600"><strong>Pickup Date:</strong> {pickupDate}</p>
          <p className="text-sm text-gray-600"><strong>Return Date:</strong> {returnDate}</p>
          <p className="text-sm text-gray-600"><strong>Duration:</strong> {duration}</p>
          <p className="text-sm text-gray-600"><strong>Discount:</strong> {discount}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Vehicle Details</h2>
          <p className="text-sm text-gray-600"><strong>Vehicle Type:</strong> {vehicleType}</p>
          <p className="text-sm text-gray-600"><strong>Vehicle:</strong> {vehicle}</p>
          {carDetails && (
            <p className="text-sm text-gray-600"><strong>Rate Range:</strong> ${carDetails.rates.daily} - ${carDetails.rates.weekly}</p>
          )}
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Additional Charges</h2>
          {collisionDamageWaiver && (
            <p className="text-sm text-gray-600">Collision Damage Waiver: $9.00</p>
          )}
          {liabilityInsurance && (
            <p className="text-sm text-gray-600">Liability Insurance: $15.00</p>
          )}
          {rentalTax && (
            <p className="text-sm text-gray-600">Rental Tax: ${(total * 0.115).toFixed(2)}</p>
          )}
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">Total</h2>
        <p className="text-sm text-gray-600"><strong>Total:</strong> ${total}</p>
      </div>
      <div className="mt-8 text-sm text-gray-600">
        <p>Thank you for choosing our services. At Nyntax, we strive to provide exceptional software solutions tailored to your needs.</p>
        <p>If you have any questions or need further assistance, please feel free to contact us. We look forward to serving you again in the future!</p>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded-md">
        <h2 className="text-xl font-bold text-gray-800 mb-2">About Nyntax</h2>
        <p className="text-sm text-gray-600 mb-4">
          Nyntax is a software development company that builds custom software solutions for businesses of all sizes. We specialize in UI/UX design, app development using Flutter, admin dashboard, and website development using the MERN stack. Our goal is to provide our clients with the best possible software solutions that help them achieve their business goals.
        </p>
        {/* <p className="text-sm text-gray-600 mb-4">
          If you are looking for a software development company that can help you take your business to the next level, then we encourage you to contact Nyntax. We would be happy to discuss your needs and how we can help you achieve your goals.
        </p> */}
        <p className="text-sm text-gray-600">
          Visit our website: <a href="https://www.nyntax.com" className="text-blue-500 underline">www.nyntax.com</a>
        </p>
      </div>
      <div className="mt-2 text-center">
        <p className="text-sm text-gray-600">© {new Date().getFullYear()} Nyntax. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Invoice;
