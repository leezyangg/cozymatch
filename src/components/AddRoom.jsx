import loginImg from '../assets/room.jpg'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddRoom() {

    const date = new Date();

    const [formData, setFormData] = useState({
        Room_ID: Math.round(Math.random() * 100),
        propertyName: '',
        address: '',
        type: '',
        furnishing: '',
        rentalFee: '',
        vacancy: '',
        bedroom: 5,
        bathroom: 3,
        parking: 2,
        availability: true,
        postedDate: date,
        facilities: [],
        description: '',
        agreeToTerms: false,
        image: null,
        video: null
    });

    const navigate = useNavigate();

    const navigateToRoomListing = () => {
        // 👇️ navigate to /contacts
        navigate('/roomlist');
    };

    const handleFacilitiesChange = (event) => {
        const { value, checked } = event.target;
        let updatedFacilities = [...formData.facilities];

        if (checked) {
            // Add the facility to the array
            updatedFacilities.push(value);
        } else {
            // Remove the facility from the array
            updatedFacilities = updatedFacilities.filter(
                (facility) => facility !== value
            );
        }

        setFormData((prevData) => ({
            ...prevData,
            facilities: updatedFacilities,
        }));
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        // Handle checkbox input separately
        if (type === 'checkbox') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: checked
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleVideoInputChange = (e) => {
        setFormData({
            ...formData,
            video: e.target.files[0]
        });
    };

    const handlePicturesInputChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("in vue script");
        console.log(formData);

        // Create a new FormData object
        const data = new FormData();

        // Append each form field to the FormData object
        for (const key in formData) {
            if (key === "image") {
                for (let i = 0; i < formData.image.length; i++) {
                    data.append("image", formData.image[i]);
                }
            } else {
                data.append(key, formData[key]);
            }
        }

        // Send the form data to the backend using Axios
        /*axios.post('http://localhost:3000/addroom', formData)
            .then((response) => {
                // Handle the response from the backend
                console.log('Response from backend:', response.data);
                // Optionally, you can navigate to the RoomListing page here
                navigateToRoomListing();
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error('Error:', error);
            });*/

        // Send the form data to the backend
        fetch('http://localhost:3000/api/post', {
            method: 'POST',

            body: data // Use FormData object
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response from the backend
                console.log('Response from backend:', data);
                // Optionally, you can navigate to the RoomListing page here
                navigateToRoomListing();
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error('Error:', error);
            });
    };

    return (
        <div className='grid gird-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'><img className='w-full h-full object-cover' src={loginImg} alt="" /></div>
            <div className='bg-gray-100 flex flex-col justify-center'>
                <form className='max-w-[700px] w-full mx-auto' onSubmit={handleSubmit}>
                    <h2 className="text-3xl font-bold py-5 mx-2">
                        List New Room
                    </h2>
                    <div className='flex flex-col py-2 mx-2'>
                        <label>Property Title{' '}
                            <span className="text-red-600">*</span></label>
                        <input className='border p-2' type="text"
                            name="propertyName" // Add name attribute
                            value={formData.propertyName} // Bind value to the state
                            onChange={handleInputChange} // Handle input change
                        />
                    </div>
                    <div className='flex flex-col py-2 mx-2'>
                        <label>Address & Location{' '}
                            <span className="text-red-600">*</span></label>
                        <input className='border p-2' type="text"
                            name="address" // Add name attribute
                            value={formData.address} // Bind value to the state
                            onChange={handleInputChange} // Handle input change
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-1 mx-2 py-2'>
                        <div>
                            <div className='py-2'>
                                <label>Type{' '}
                                    <span className="text-red-600">*{' '}</span></label>
                                <input className='border p-2' type="text"
                                    name="type" // Add name attribute
                                    value={formData.type} // Bind value to the state
                                    onChange={handleInputChange} // Handle input change
                                />
                            </div>
                            <div className='py-2'>
                                <label>Furnishing{' '}
                                    <span className="text-red-600">*{' '}</span></label>
                                <input className='border p-2' type="text"
                                    name="furnishing" // Add name attribute
                                    value={formData.furnishing} // Bind value to the state
                                    onChange={handleInputChange} // Handle input change
                                />
                            </div>
                        </div>
                        <div>
                            <div className='py-2'>
                                <label>Price (RM){' '}
                                    <span className="text-red-600">*{' '}</span></label>
                                <input className='border p-2' type="text"
                                    name="rentalFee" // Add name attribute
                                    value={formData.rentalFee} // Bind value to the state
                                    onChange={handleInputChange} // Handle input change
                                />
                            </div>
                            <div className='py-2'>
                                <label>Vacancy{' '}
                                    <span className="text-red-600">*{' '}</span></label>
                                <input className='border p-2' type="text"
                                    name="vacancy" // Add name attribute
                                    value={formData.vacancy} // Bind value to the state
                                    onChange={handleInputChange} // Handle input change
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Facilities</label>
                        <div className='grid grid-cols-3 gap-1'>

                            <div>
                                <p>
                                    <input type="checkbox"
                                        name="wifi"
                                        value="Wifi"
                                        checked={formData.facilities.includes('Wifi')}
                                        onChange={handleFacilitiesChange}
                                    /> Wifi
                                </p>
                                <p>
                                    <input type="checkbox"
                                        name="aircond"
                                        value="aircond"
                                        checked={formData.facilities.includes('aircond')}
                                        onChange={handleFacilitiesChange}
                                    /> Air-conditioning
                                </p>
                                <p>
                                    <input type="checkbox"
                                        name="business"
                                        value="business"
                                        checked={formData.facilities.includes('business')}
                                        onChange={handleFacilitiesChange}
                                    /> Business Center
                                </p>
                                <p>
                                    <input type="checkbox"
                                        name="refrigerator"
                                        value="refrigerator"
                                        checked={formData.facilities.includes('refrigerator')}
                                        onChange={handleFacilitiesChange}
                                    /> Refrigerator
                                </p>
                                <p>
                                    <input type="checkbox"
                                        name="kitchen"
                                        value="kitchen"
                                        checked={formData.facilities.includes('kitchen')}
                                        onChange={handleFacilitiesChange}
                                    /> Kitchen Utility
                                </p>
                            </div>
                            <div>
                                <p>
                                    <input type="checkbox"
                                        name="balcony"
                                        value="balcony"
                                        checked={formData.facilities.includes('balcony')}
                                        onChange={handleFacilitiesChange}
                                    /> Balcony
                                </p>
                                <p>
                                    <input type="checkbox"
                                        name="gymnasium"
                                        value="gymnasium"
                                        checked={formData.facilities.includes('gymnasium')}
                                        onChange={handleFacilitiesChange}
                                    /> Gymnasium
                                </p>
                                <p>
                                    <input type="checkbox"
                                        name="minimarket"
                                        value="minimarket"
                                        checked={formData.facilities.includes('minimarket')}
                                        onChange={handleFacilitiesChange}
                                    /> Mini Market
                                </p>
                                <p>
                                    <input type="checkbox"
                                        name="playground"
                                        value="playground"
                                        checked={formData.facilities.includes('playground')}
                                        onChange={handleFacilitiesChange}
                                    /> Playground
                                </p>
                                <p>
                                    <input type="checkbox"
                                        name="salon"
                                        value="salon"
                                        checked={formData.facilities.includes('salon')}
                                        onChange={handleFacilitiesChange}
                                    /> Salon
                                </p>
                            </div>
                            <div>
                                <p>
                                    <input type="checkbox"
                                        name="pool"
                                        value="pool"
                                        checked={formData.facilities.includes('pool')}
                                        onChange={handleFacilitiesChange}
                                    /> Swimming Pool
                                </p>
                                <p>
                                    <input type="checkbox"
                                        name="squash"
                                        value="squash"
                                        checked={formData.facilities.includes('squash')}
                                        onChange={handleFacilitiesChange}
                                    /> Squash Court
                                </p>
                                <p>
                                    <input type="checkbox"
                                        name="tennis"
                                        value="tennis"
                                        checked={formData.facilities.includes('tennis')}
                                        onChange={handleFacilitiesChange}
                                    /> Tennis Court
                                </p>
                                <p>
                                    <input type="checkbox"
                                        name="badminton"
                                        value="badminton"
                                        checked={formData.facilities.includes('badminton')}
                                        onChange={handleFacilitiesChange}
                                    /> Badminton Court
                                </p>
                                <p>
                                    <input type="checkbox"
                                        name="security"
                                        value="security"
                                        checked={formData.facilities.includes('security')}
                                        onChange={handleFacilitiesChange}
                                    /> 24 Hours Security
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className='flex flex-col py-2'>
                        <label>Description</label>
                        <input className='border p-2' type="text"
                            name="description" // Add name attribute
                            value={formData.description} // Bind value to the state
                            onChange={handleInputChange} // Handle input change
                        />
                    </div>

                    <div>
                        <label className="my-5 py-2 relative flex items-center">
                            {/* <BsUpload className="mr-2" /> */}
                            Upload Property Video{' '}
                            <span className="text-red-600">*</span>
                            <input
                                type="file"
                                accept="video/*"
                                name="video" // Add name attribute
                                onChange={handleVideoInputChange}
                                multiple
                            />
                        </label>
                    </div>
                    <div>
                        <label className="w-full my-5 py-2 relative flex items-center ">
                            {/* <BsUpload className="mr-2" /> */}
                            Upload Property Pictures
                            <input
                                type="file"
                                accept="image/*"
                                name="image" // Add name attribute
                                onChange={handlePicturesInputChange}
                                multiple
                            />
                        </label>
                    </div>


                    <div>
                        <p>
                            <input type="checkbox"
                                name="agreeToTerms" // Add name attribute
                                checked={formData.agreeToTerms} // Bind checked to the state
                                onChange={handleInputChange} // Handle input change
                            /> I agree to the terms and conditions of CozyMatch{' '}
                            <span className="text-red-600">*</span>
                        </p>
                        <button type='submit' className='border w-full my-5 py-2 bg-amber-900 hover:bg-yellow-800 text-white'>Submit</button>

                    </div>
                </form>
            </div>
        </div>
    )
}