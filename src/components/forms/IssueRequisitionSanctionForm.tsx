"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

export default function IssueRequisitionSanctionForm() {
  const [activeTab, setActiveTab] = useState("items");

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Issue Requisition Sanction
      </h2>

      {/* Bagian Header Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8">
        <Select label="Current Store:" id="current-store">
          <option>GUDANG</option>
        </Select>
        <Input label="Sanctioned By: *" id="sanctioned-by" type="text" />
        <Input
          label="Date of Sanction: *"
          id="date-of-sanction"
          type="date"
          defaultValue="2025-02-18"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
        <div>
          <label
            htmlFor="sir-number"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            SIR Number:
          </label>
          <textarea
            id="sir-number"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        <Input
          label="Source:"
          id="source"
          type="text"
          value="Administrative Unit"
          readOnly
        />
        <Input label="Reference Number:" id="ref-no" type="text" readOnly />
        <Input
          label="Date:"
          id="date"
          type="date"
          defaultValue="2025-10-05"
          readOnly
        />
        <Input
          label="Administrative Unit:"
          id="admin-unit"
          type="text"
          readOnly
        />
        <Input
          label="SIR Source Date:"
          id="sir-source-date"
          type="date"
          defaultValue="2025-10-05"
          readOnly
        />
        <Input label="Requested By:" id="requested-by" type="text" readOnly />
        <Input label="Status:" id="status" type="text" readOnly />
        <Input label="Sanction Remarks:" id="sanction-remarks" type="text" />
      </div>

      {/* Bagian Items Table */}
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
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Allocation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Allocation Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Purpose
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
              {/* Strukturnya sama, Anda bisa sesuaikan kolom jika perlu */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Code
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Allocation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Allocation Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Purpose
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

      <div className="mt-8 flex justify-between">
        <div>
          <Button variant="secondary" className="mr-2">
            Show Budget Quantity
          </Button>
          <Button variant="secondary">Query Item Storage Location</Button>
        </div>
        <div className="space-x-4">
          <Button variant="secondary">Reset</Button>
          <Button variant="primary">Save</Button>
          <Button variant="secondary">Close</Button>
        </div>
      </div>
    </div>
  );
}
