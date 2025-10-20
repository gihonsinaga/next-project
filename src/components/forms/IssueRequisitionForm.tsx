// "use client";

// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import { getStore } from "@/redux/actions/storeActions";
// import { Input } from "@/components/ui/Input";
// import { Select } from "@/components/ui/Select";
// import { Button } from "@/components/ui/Button";

// export default function IssueRequisitionForm() {
//   const [activeTab, setActiveTab] = useState("items");
//   const dispatch: AppDispatch = useDispatch();

//   // Ambil data stores saja dari Redux state
//   const { stores } = useSelector((state: RootState) => state.store);

//   // Panggil action getStore saat komponen pertama kali di-mount
//   useEffect(() => {
//     dispatch(getStore());
//   }, [dispatch]);

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">
//         Issue Requisition
//       </h2>

//       {/* Header */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//         <Select label="Store: *" id="store">
//           <option value="" disabled>
//             Select a store
//           </option>
//           {stores.map((storeName) => (
//             <option key={storeName} value={storeName}>
//               {storeName}
//             </option>
//           ))}
//         </Select>
//         <Input
//           label="SIR No: *"
//           id="sir-no"
//           type="text"
//           placeholder="Auto-generated"
//           disabled
//         />
//         <Select label="Source: *" id="source">
//           <option>Administrative Unit</option>
//           {/*Api*/}
//         </Select>

//         <Input
//           label="SIR Source Date:"
//           id="sir-source-date"
//           type="date"
//           defaultValue="2025-10-05"
//         />
//         <Input label="Reference No:" id="ref-no" type="text" />
//         <Input
//           label="Date: *"
//           id="date"
//           type="date"
//           defaultValue="2025-10-05"
//         />
//         <Select label="Administrative Unit:" id="admin-unit">
//           <option>Administrative unit</option>
//           {/* APi */}
//         </Select>
//         <Select label="Requested By:" id="admin-unit">
//           <option>A. KADIR</option>
//           {/* APi */}
//         </Select>
//         <Input
//           label="Status:"
//           id="status"
//           type="text"
//           value="Pending For Sanction"
//           readOnly
//         />
//       </div>

//       {/* Bagian Items*/}
//       <div className="mb-8">
//         {/* Bagian Tab */}
//         <div className="border-b border-gray-200">
//           <nav className="-mb-px flex space-x-6" aria-label="Tabs">
//             <button
//               onClick={() => setActiveTab("items")}
//               className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
//                 activeTab === "items"
//                   ? "border-blue-500 text-blue-600"
//                   : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//               }`}
//             >
//               Items
//             </button>
//             <button
//               onClick={() => setActiveTab("directItems")}
//               className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
//                 activeTab === "directItems"
//                   ? "border-blue-500 text-blue-600"
//                   : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
//               }`}
//             >
//               Direct Items
//             </button>
//           </nav>
//         </div>

//         {/* Konten Tabel yang Ditampilkan Berdasarkan Tab Aktif */}
//         <div className="mt-4">
//           {/* Tabel untuk "Items" */}
//           {activeTab === "items" && (
//             <div className="overflow-x-auto border rounded-lg">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Item Code
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Item Name
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Purpose
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       UOM
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Qty Requested
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   <tr>
//                     <td
//                       className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
//                       colSpan={5}
//                     >
//                       No items added.
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* Tabel untuk "Direct Items" */}
//           {activeTab === "directItems" && (
//             <div className="overflow-x-auto border rounded-lg">
//               {/* Strukturnya sama, Anda bisa sesuaikan kolom jika perlu */}
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Item Code
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Item Name
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Purpose
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       UOM
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Qty Requested
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   <tr>
//                     <td
//                       className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
//                       colSpan={5}
//                     >
//                       No direct items added.
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/*Remark & Actions */}
//       <div>
//         <label
//           htmlFor="remark"
//           className="block text-sm font-medium text-gray-600 mb-1"
//         >
//           Remark:
//         </label>
//         <textarea
//           id="remark"
//           rows={4}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//         ></textarea>
//       </div>

//       <div className="mt-8 flex justify-end space-x-4">
//         <Button variant="secondary">Reset</Button>
//         <Button variant="primary">Save</Button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getStore } from "@/redux/actions/storeActions";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

export default function IssueRequisitionForm() {
  const [activeTab, setActiveTab] = useState("items");
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();

  const { stores } = useSelector((state: RootState) => state.store);

  useEffect(() => {
    dispatch(getStore());
  }, [dispatch]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Issue Requisition
      </h2>

      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* komponen Select*/}
        <Select
          label="Store: *"
          id="store"
          options={stores}
          value={selectedStore}
          onChange={setSelectedStore}
          placeholder="select a store"
        />

        {/* Input fields*/}
        <Input
          label="SIR No: *"
          id="sir-no"
          type="text"
          placeholder="Auto-generated"
          disabled
        />
        <Input
          label="Source: *"
          id="source"
          placeholder="Administrative Unit"
        />
        <Input
          label="SIR Source Date:"
          id="sir-source-date"
          type="date"
          defaultValue="2025-10-05"
        />
        <Input label="Reference No:" id="ref-no" type="text" />
        <Input
          label="Date: *"
          id="date"
          type="date"
          defaultValue="2025-10-05"
        />
        <Input
          label="Administrative Unit:"
          id="admin-unit"
          placeholder="Administrative unit"
        />
        <Input label="Requested By:" id="requested-by" placeholder="A. KADIR" />
        <Input
          label="Status:"
          id="status"
          type="text"
          value="Pending For Sanction"
          readOnly
        />
      </div>

      {/* Bagian Items*/}
      <div className="mb-8">
        {/* Bagian Tab */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("items")}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === "items"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Items
            </button>
            <button
              onClick={() => setActiveTab("directItems")}
              className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === "directItems"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Direct Items
            </button>
          </nav>
        </div>

        {/* Konten Tabel yang Ditampilkan Berdasarkan Tab Aktif */}
        <div className="mt-4">
          {/* Tabel untuk "Items" */}
          {activeTab === "items" && (
            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Purpose
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      UOM
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Qty Requested
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      colSpan={5}
                    >
                      No items added.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Tabel untuk "Direct Items" */}
          {activeTab === "directItems" && (
            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Purpose
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      UOM
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Qty Requested
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      colSpan={5}
                    >
                      No direct items added.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Remark & Actions */}
      <div>
        <label
          htmlFor="remark"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Remark:
        </label>
        <textarea
          id="remark"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        ></textarea>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <Button variant="secondary">Reset</Button>
        <Button variant="primary">Save</Button>
      </div>
    </div>
  );
}
