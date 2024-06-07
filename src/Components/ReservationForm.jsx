import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ReservationForm() {
    const navigate = useNavigate()
    const [cars, setCars] = useState([]);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [selectedCar, setSelectedCar] = useState(null);
    const [formData, setFormData] = useState({
        reservationID: '',
        pickupDate: '',
        returnDate: '',
        duration: '',
        discount: 0,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        collisionDamageWaiver: false,
        liabilityInsurance: false,
        rentalTax: false,
        vehicleType: '',
        vehicle: '',
        total: 0,
    });

    useEffect(() => {
        fetch('https://exam-server-7c41747804bf.herokuapp.com/carsList')
            .then(response => response.json())
            .then(data => {
                setCars(data.data);
                setVehicleTypes([...new Set(data.data.map(car => car.type))]);
            })
            .catch(error => console.error('Error fetching cars:', error));
    }, []);

    useEffect(() => {
        if (formData.pickupDate && formData.returnDate) {
            const pickupDate = new Date(formData.pickupDate);
            const returnDate = new Date(formData.returnDate);
            const durationInDays = (returnDate - pickupDate) / (1000 * 60 * 60 * 24);

            const weeks = Math.floor(durationInDays / 7);
            const days = durationInDays % 7;
            setFormData(prevData => ({
                ...prevData,
                duration: `${weeks} Week${weeks !== 1 ? 's' : ''} ${days} Day${days !== 1 ? 's' : ''}`
            }));
        }
    }, [formData.pickupDate, formData.returnDate]);

    // useEffect(() => {
    //     calculateTotal();
    // }, [formData, selectedCar]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
        setFormData(prevData => ({
            ...prevData,
            vehicleType: e.target.value,
            vehicle: ''
        }));
    };

    const handleCarChange = (e) => {
        const selectedCarId = e.target.value;
        const car = cars.find(car => car.id === selectedCarId);
        setSelectedCar(car);
        setFormData(prevData => ({
            ...prevData,
            vehicle: selectedCarId
        }));
    };

    const calculateTotal = () => {
        if (!formData.pickupDate || !formData.returnDate || !selectedCar) {
            return;
        }

        const pickupDate = new Date(formData.pickupDate);
        const returnDate = new Date(formData.returnDate);
        const durationInDays = (returnDate - pickupDate) / (1000 * 60 * 60 * 24);
        const discount = parseFloat(formData.discount) || 0;

        let total = selectedCar ? (selectedCar.rates.daily * durationInDays) : 0;
        if (formData.collisionDamageWaiver) total += 9;
        if (formData.liabilityInsurance) total += 15;
        if (formData.rentalTax) total += total * 0.115;
        total -= discount;

        setFormData(prevData => ({
            ...prevData,
            total: total.toFixed(2)
        }));
    };

      useEffect(() => {
        calculateTotal();
      }, [selectedCar, formData.pickupDate, formData.returnDate, formData.collisionDamageWaiver, formData.liabilityInsurance, formData.rentalTax, formData.discount]);

      const generateInvoice = () => {
        if (!formData.pickupDate || !formData.returnDate || !selectedCar) {
            return;
        }

        const total = formData.total;

        const invoice = {
            ...formData,
            total: total,
            carDetails: selectedCar,
            invoiceDate: new Date().toLocaleDateString(),
        };

        navigate('/invoice', { state: { invoiceData: invoice } });
    };
    return (
        <div className="lg:pt-4 md:p-4 lg:p-0">
            <div className="flex justify-between mt-4 mx-2 items-center mb-6">
                <h1 className="text-3xl font-bold">Reservation</h1>

                <button onClick={generateInvoice}  className="p-2 bg-blue-500 font-black text-white rounded">Print/Download</button>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-2/3  mb-4">
                    <div className="flex flex-wrap ">
                        <div className="w-full md:w-1/2  mb-4">
                            <div className="bg-white shadow-md rounded-lg p-4">
                                <h2 className="text-2xl font-bold mb-4">Reservation Details</h2>
                                <hr className='border border-1 mb-2 border-blue-400' />
                                <div className="grid grid-cols-1 gap-4">
                                    <span className="label-text">Reservation ID</span>
                                    <input type="text" name="reservationID" placeholder="Reservation ID" onChange={handleChange} className="p-2 border rounded" />
                                    <span className="label-text">Pickup Date<sup className='text-red-600 text-base '>*</sup></span>
                                    <input type="datetime-local" name="pickupDate" onChange={handleChange} className="p-2 border rounded" required />
                                    <span className="label-text">Return Date<sup className='text-red-600 text-base '>*</sup></span>
                                    <input type="datetime-local" name="returnDate" onChange={handleChange} className="p-2 border rounded" required />
                                    <span className="label-text">Duration</span>
                                    <input type="text" name="duration" value={formData.duration} readOnly className="p-2 border rounded" />
                                    <span className="label-text">Discount</span>
                                    <input type="number" name="discount" placeholder="Discount" onChange={handleChange} className="p-2 border rounded" />
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <div className="bg-white shadow-md rounded-lg p-4">
                                <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
                                <hr className='border border-1 mb-2 border-blue-400' />
                                <div className="grid grid-cols-1 gap-4">
                                    <span className="label-text">First Name <sup className='text-red-600 text-base '>*</sup></span>
                                    <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} className="p-2 border rounded" required />
                                    <span className="label-text">Last Name<sup className='text-red-600 text-base '>*</sup></span>
                                    <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} className="p-2 border rounded" required />
                                    <span className="label-text">Email<sup className='text-red-600 text-base '>*</sup></span>
                                    <input type="email" name="email" placeholder="Email" onChange={handleChange} className="p-2 border rounded" required />
                                    <span className="label-text">Phone<sup className='text-red-600 text-base '>*</sup></span>
                                    <input type="text" name="phone" placeholder="Phone" onChange={handleChange} className="p-2 border rounded" required />
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <div className="bg-white shadow-md rounded-lg p-4">
                                <h2 className="text-2xl font-bold mb-4">Vehicle Information</h2>
                                <hr className='border border-1 mb-2 border-blue-400' />
                                <div className="grid grid-cols-1 gap-4">
                                    <span className="label-text">Vehicle Type<sup className='text-red-600 text-base '>*</sup></span>
                                    <select name="vehicleType" onChange={handleTypeChange} className="p-2 border rounded w-full mb-4" required>
                                        <option value="">Select Vehicle Type</option>
                                        {vehicleTypes.map((type, index) => (
                                            <option key={index} value={type}>{type}</option>
                                        ))}
                                    </select>
                                    <span className="label-text">Vehicle <sup className='text-red-600 text-base '>*</sup></span>
                                    <select name="vehicle" value={formData.vehicle} onChange={handleCarChange} className="p-2 border rounded w-full" required>
                                        <option value="">Select Vehicle</option>
                                        {cars
                                            .filter(car => car.type === selectedType)
                                            .map(car => (
                                                <option key={car.id} value={car.id}>{car.make} {car.model}</option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <div className="bg-white shadow-md rounded-lg p-4">
                                <h2 className="text-2xl font-bold mb-4">Additional Charges</h2>
                                <hr className='border border-1 mb-2 border-blue-400' />
                                <div className="grid grid-cols-1 gap-4">
                                    <label className="flex justify-between items-center">
                                        <input type="checkbox" name="collisionDamageWaiver" onChange={handleChange} className="mr-2" />
                                        <span className="mr-2">Collision Damage Waiver</span>
                                        <span className="ml-auto mr-4">$9.00</span>
                                    </label>
                                    <label className="flex justify-between items-center">
                                        <input type="checkbox" name="liabilityInsurance" onChange={handleChange} className="mr-2" />
                                        <span className="mr-2">Liability Insurance</span>
                                        <span className="ml-auto mr-4">$15.00</span>
                                    </label>
                                    <label className="flex justify-between items-center">
                                        <input type="checkbox" name="rentalTax" onChange={handleChange} className="mr-2" />
                                        <span className="mr-2">Rental Tax</span>
                                        <span className="ml-auto mr-4">11.5%</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/3  px-2 mb-4">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-2xl font-bold mb-4">Charges Summary</h2>
                        <hr className='border border-1 mb-2 border-blue-400' />
                        <div className="bg-blue-200 p-4 rounded ">
                            <div className="grid grid-cols-4 gap-4 mb-4 font-semibold">
                                <span>Charge</span>
                                <span>Unit</span>
                                <span>Rate</span>
                                <span>Total</span>
                            </div>
                            <hr className='border border-1 mb-2 border-blue-400' />
                            {selectedCar && (
                                <>
                                    <div className="grid grid-cols-4 gap-4 mb-2">
                                        <span>Daily</span>
                                        <span>1</span>
                                        <span>${selectedCar.rates.daily.toFixed(2)}</span>
                                        <span>${selectedCar.rates.daily.toFixed(2)}</span>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4 mb-2">
                                        <span>Weekly</span>
                                        <span>1</span>
                                        <span>${selectedCar.rates.weekly.toFixed(2)}</span>
                                        <span>${selectedCar.rates.weekly.toFixed(2)}</span>
                                    </div>
                                </>
                            )}
                            {formData.collisionDamageWaiver && (
                                <div className="grid grid-cols-4 gap-4 mb-2">
                                    <span>Collision Damage Waiver</span>
                                    <span>1</span>
                                    <span>$9.00</span>
                                    <span>$9.00</span>
                                </div>
                            )}
                            {formData.liabilityInsurance && (
                                <div className="grid grid-cols-4 gap-4 mb-2">
                                    <span>Liability Insurance</span>
                                    <span>1</span>
                                    <span>$15.00</span>
                                    <span>$15.00</span>
                                </div>
                            )}
                            {formData.rentalTax && (
                                <div className="grid grid-cols-4 gap-4 mb-2">
                                    <span>Rental Tax</span>
                                    <span>1</span>
                                    <span>11.5%</span>
                                    <span>${(formData.total * 0.115).toFixed(2)}</span>
                                </div>
                            )}

                            <div className="flex justify-between mt-16 text-xl font-bold">
                                <div>Total :</div> <div>$ {formData.total}</div>
                            </div>
                        </div>
                       

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReservationForm;