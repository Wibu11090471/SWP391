import React, { useEffect, useState } from "react";
import CreateService from "./AppointmentManagement/ServiceImageContainer/CreateService";
import CreateImage from "./AppointmentManagement/ServiceImageContainer/CreateImage";
import axios from "axios";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import UpdateService from "./AppointmentManagement/ServiceImageContainer/UpdateService";

/******  7248c50b-2bae-4bf5-b9c0-31bf4dd27299  *******/const createApiInstance = () => {
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

const ServiceImageContainer = () => {
  const [service, setService] = useState([]);
  const [categories, setCategory] = useState([]);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isUpdateModalOpen, setIisUpdateModalOpen] = useState(false);
  const [addImageServiceId, setAddImageServiceId] = useState("");
  const [updateService, setUpdateService] = useState({});

  useEffect(() => {
      const fetchData = async () => {
        const apiInstance = createApiInstance();
        try {
          const bookingResponse = await apiInstance.get("/api/Service/getAllService");
          setService(bookingResponse.data.items);
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };
  
      fetchData();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        const apiInstance = createApiInstance();
        try {
          const bookingResponse = await apiInstance.get("/api/CategoryService/getActive");
          setCategory(bookingResponse.data);
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };
  
      fetchData();
    }, []);

  const HandleAddImage = (service) => {
    setIsImageModalOpen(true);
    setAddImageServiceId(service.id);
  };

  const HandleUpdateService = (service) => {
    setIisUpdateModalOpen(true);
    setUpdateService(service);
  };

  const HandleChangeStatus = (service) => {
    service.status = !service.status;
    const apiInstance = createApiInstance();
    apiInstance
      .put(`/api/Service/update-all/${service.id}`, service)
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
               Tạo Dịch Vụ
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
                 Dịch vụ
               </th>
               <th className="px-4 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                 Giá
               </th>
               <th className="px-4 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                 Thời Gian
               </th>
               <th className="px-3 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                 Discount
               </th>
               <th className="px-3 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                 Mô tả
               </th>
               <th className="px-3 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                 Trạng thái
               </th>
               <th className="px-3 py-3 text-left text-xs font-medium text-[#5D4037] uppercase tracking-wider">
                 Thao tác
               </th>
             </tr>
           </thead>
           <tbody>
             {service.map((s, index) => (
               <tr key={index}>
                 <td className="border p-3">{s.categoryService.title}</td>
                 <td className="border p-3">{s.title}</td>
                 <td className="border p-3">{s.price}</td> 
                 <td className="border p-3">{s.timeService}</td> 
                 <td className="border p-3">{s.discount ? s.discount : "0"}</td>
                 <td className="border p-3 w-[250px]">{s.description}</td> 
                 <td className="border p-3 text-green-500 font-semibold">
                  {s.status ? 
                    <button
                      onClick={() => HandleChangeStatus(s)}
                     className={`px-3 py-2 rounded-lg transition-all duration-300 bg-[#FFF0E1] text-green-500 hover:bg-[#e89248]`} >
                       Active
                   </button>
                  :<button 
                    onClick={() => HandleChangeStatus(s)}
                    className={`px-3 py-2 rounded-lg transition-all duration-300 bg-[#FFF0E1] text-[#5D4037] hover:bg-[#e89248]`} >
                      InActive
                    </button>}
                 </td>
                 <td className="border p-2 w-[250px] font-semibold">
                   <button
                       onClick={() => HandleAddImage(s)}
                       className={`px-3 py-2 mr-2 rounded-lg transition-all duration-300 bg-[#FFF0E1] text-[#5D4037] hover:bg-[#e89248]`}
                     >
                       Thêm Ảnh
                   </button>

                   <button
                       onClick={() => HandleUpdateService(s)}
                       className={`px-3 py-2 rounded-lg transition-all duration-300 bg-[#FFF0E1] text-[#5D4037] hover:bg-[#e89248]`}
                     >
                       Update
                   </button>
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
             <CreateService
               categories={categories}
               onclose={() => setIsServiceModalOpen(null)}
             />
           </div>
    )}
   {isImageModalOpen && 
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <CreateImage
            initialServiceId={addImageServiceId}
            onclose={() => setIsImageModalOpen(null)}
          />
        </div>
    }
    {isUpdateModalOpen && 
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <UpdateService
            service={updateService}
            onclose={() => setIisUpdateModalOpen(null)}
          />
        </div>
    }
    </>
  );
};

export default ServiceImageContainer;
