import { useState } from "react";
import { toast } from "react-toastify";

const ApplyDietition = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    university: "",
    graduationYear: "",
    experience: "",
    status: "pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can handle form submission logic here (e.g., send data to backend)
    const token = localStorage.getItem('token')
    console.log("Form submitted:", formData);
    const DietitionData = { formData };
    const response = await fetch("https://deployment-1-99ih.onrender.com/applydietitonform", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(DietitionData),
    });
    const result = await response.json();
    console.log(result);
    if(!response.ok){
      toast.error(result.message,{
        position:"top-center"
      })
      return

    }
    if(response.ok){
      toast.success(result.message,{
        position:"top-center"
      })
      setFormData({
        name: '',
        email: '',
        contactNo: '',
        university: '',
        graduationYear: '',
        experience: '',
      });
      return
    }
   
   
  };
  return (
    <div className="bg-[#233037] pt-24 pb-4">
      <div className="max-w-md mx-auto ">
        <h2 className="text-xl font-bold mb-4 text-white">Apply to Become a Dietitian</h2>
        <form onSubmit={handleSubmit} className="space-y-4 bg-[#4a5976] rounded-md p-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 px-3 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 px-3 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="contactNo"
              className="block text-sm font-medium text-white"
            >
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNo"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              className="mt-1 px-3 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="university"
              className="block text-sm font-medium text-white"
            >
              University
            </label>
            <input
              type="text"
              id="university"
              name="university"
              value={formData.university}
              onChange={handleChange}
              className="mt-1 px-3 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="graduationYear"
              className="block text-sm font-medium text-white"
            >
              Graduation Year
            </label>
            <input
              type="number"
              id="graduationYear"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className="mt-1 px-3 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-white"
            >
              Experience
            </label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows="4"
              className="mt-1 px-3 py-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-400 transition-colors"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};
export default ApplyDietition;
