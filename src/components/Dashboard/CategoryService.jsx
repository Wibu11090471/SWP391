import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateCategory from "./AppointmentManagement/Category/CreateCategory";

const createApiInstance = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "https://localhost:7081",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};

const CategoryService = () => {
  const [categories, setCategory] = useState([]);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);


    useEffect(() => {
      const fetchData = async () => {
        const apiInstance = createApiInstance();
        try {
          const bookingResponse = await apiInstance.get("/api/CategoryService/getAll");
          setCategory(bookingResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };
  
      fetchData();
    }, []);

  const HandleChangeStatus = (category) => {
    const apiInstance = createApiInstance();
    apiInstance
      .put(`/api/CategoryService/changeStatus/${category.id}`)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  };

  return (
   <> 
   <div className="min-h-screen flex bg-[#FDF5E6] pt-20">
     {/* Sidebar */}
     <div className="sidebar w-1/4 bg-gray-800 text-white p-6 shadow-lg">
       <h2 className="text-2xl font-bold mb-8 pl-3 text-yellow-400">
         Dashboard
       </h2>
       <ul>
         <li>
           <a
             href="/selectedField"
             className="block py-3 text-lg hover:bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-yellow-400"
           >
             Lịch hẹn
           </a>
         </li>
         <li>
           <a
             href="/addserviceimage"
             className="block py-3 text-lg hover:bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-yellow-400"
           >
             Thêm dịch vụ
           </a>
         </li>
         <li>
           <a
             href="/addCategoryService"
             className="block py-3 text-lg hover:bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-yellow-400"
           >
             Thêm loại dịch vụ
           </a>
         </li>
         <li>
           <a
             href="/history"
             className="block py-3 text-lg hover:bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-yellow-400"
           >
             Lịch sử giao dịch
           </a>
         </li>
         <li>
           <a
             href="/statistics"
             className="block py-3 text-lg hover:bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-yellow-400"
           >
             Thống kê
           </a>
         </li>
         <li>
           <a
             href="/stylistcommission"
             className="block py-3 text-lg hover:bg-gray-700 px-4 rounded-lg transition-all duration-300 ease-in-out hover:text-yellow-400"
           >
             Quản Lý Thu Nhập Stylist
           </a>
         </li>
       </ul>
     </div>

     {/* Main Container */}
     <div className="main-container flex-1">
       {/* Content */}
       <div className="main-container flex-1 p-8">
       <h1 className="text-3xl font-bold mb-6 text-center">Services</h1>
       <div className="flex justify-end mb-4">
         <button
               onClick={() => setIsServiceModalOpen(true)}
               className={`px-6 py-2 rounded-lg transition-all duration-300 bg-[#8B4513] text-white`}
             >
               Tạo Thể Loại
         </button>
       </div>
       <div className="bg-white shadow-md rounded-lg overflow-hidden">
         <table className="w-full">
           <thead className="bg-[#FAEBD7]">
             <tr>
               <th className="px-4 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                 Thể Loại
               </th>
               <th className="px-4 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                 Mô tả
               </th>
               <th className="px-3 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                 Trạng thái
               </th>
             </tr>
           </thead>
           <tbody>
             {categories.map((c, index) => (
               <tr key={index}>
                 <td className="border p-3">{c.title}</td>
                 <td className="border p-3">{c.description}</td> 
                 <td className="border p-3 text-green-500 font-semibold">
                  {c.status ? 
                    <button
                      onClick={() => HandleChangeStatus(c)}
                     className={`px-3 py-2 rounded-lg transition-all duration-300 bg-[#FFF0E1] text-green-500 hover:bg-[#e89248]`} >
                       Active
                   </button>
                  :<button 
                    onClick={() => HandleChangeStatus(c)}
                    className={`px-3 py-2 rounded-lg transition-all duration-300 bg-[#FFF0E1] text-[#5D4037] hover:bg-[#e89248]`} >
                      InActive
                    </button>}
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
       </div>
     </div>
   </div>
   {/* Service Modal */}
   {isServiceModalOpen && (
           <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
             <CreateCategory
               onclose={() => setIsServiceModalOpen(null)}
             />
           </div>
         )}
   </>
  );
};

export default CategoryService;
