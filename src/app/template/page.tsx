"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Trash2,
  FileText,
  Users,
  DollarSign,
  Download,
  Plus,
  GripVertical,
  Table as TableIcon,
  AlignLeft,
  FileSignature,
} from "lucide-react";

// Editable Text Component
function EditableText({
  value,
  onChange,
  className = "",
  placeholder = "Klik untuk edit...",
  multiline = false,
  style = {},
}: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(value || "");
  const inputRef = useRef<any>(null);

  useEffect(() => {
    setText(value || "");
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (!multiline) {
        inputRef.current.select();
      }
    }
  }, [isEditing, multiline]);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onChange(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!multiline && e.key === "Enter") {
      e.preventDefault();
      handleBlur();
    }
  };

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          className={`w-full outline-none resize-none ${className}`}
          style={style}
          rows={Math.max(text.split("\n").length, 2)}
        />
      );
    }
    return (
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`outline-none ${className}`}
        style={style}
      />
    );
  }

  return (
    <span
      onClick={handleClick}
      className={`cursor-text hover:bg-blue-50 transition-colors ${className}`}
      style={style}
    >
      {text || <span className="text-gray-400 italic">{placeholder}</span>}
    </span>
  );
}

// Editable Table Component
function EditableTable({ rows, columns, onUpdate, className = "" }: any) {
  const [data, setData] = useState(rows);

  const handleCellChange = (
    rowIndex: number,
    colKey: string,
    value: string
  ) => {
    const newData = [...data];
    newData[rowIndex][colKey] = value;
    setData(newData);
    onUpdate(newData);
  };

  const addRow = () => {
    const newRow: any = {};
    columns.forEach((col: any) => {
      newRow[col.key] = "";
    });
    const newData = [...data, newRow];
    setData(newData);
    onUpdate(newData);
  };

  const removeRow = (index: number) => {
    const newData = data.filter((_: any, i: number) => i !== index);
    setData(newData);
    onUpdate(newData);
  };

  return (
    <div>
      <table className={`w-full border-collapse ${className}`}>
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col: any) => (
              <th
                key={col.key}
                className="border border-gray-800 p-1 text-xs"
                style={{ width: col.width }}
              >
                {col.label}
              </th>
            ))}
            <th className="border border-gray-800 p-1 w-8"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, rowIndex: number) => (
            <tr key={rowIndex}>
              {columns.map((col: any) => (
                <td key={col.key} className="border border-gray-800 p-1">
                  <EditableText
                    value={row[col.key]}
                    onChange={(val: string) =>
                      handleCellChange(rowIndex, col.key, val)
                    }
                    className="text-xs w-full"
                    placeholder={col.placeholder || "..."}
                    style={{ textAlign: col.align || "left" }}
                  />
                </td>
              ))}
              <td className="border border-gray-800 p-0 text-center">
                <button
                  onClick={() => removeRow(rowIndex)}
                  className="text-red-500 hover:bg-red-50 p-1 w-full h-full"
                  title="Hapus baris"
                >
                  <Trash2 size={12} className="mx-auto" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addRow}
        className="mt-2 text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
      >
        <Plus size={14} />
        Tambah Baris
      </button>
    </div>
  );
}

// Component Palette Item
function PaletteItem({ item }: { item: any }) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("componentType", item.type);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="flex items-center gap-3 p-3 bg-white border-2 border-gray-200 rounded-lg cursor-move hover:border-blue-400 hover:shadow-md transition-all active:opacity-50"
    >
      <GripVertical size={16} className="text-gray-400" />
      <div className="text-blue-600">{item.icon}</div>
      <span className="text-sm font-medium text-gray-700">{item.label}</span>
    </div>
  );
}

// Header Component
function HeaderComponent({ data, onUpdate, onRemove }: any) {
  return (
    <div className="relative group mb-6">
      <button
        onClick={onRemove}
        className="absolute -right-3 -top-3 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
      >
        <Trash2 size={14} />
      </button>

      <div className="text-center mb-4">
        <h2 className="text-sm font-bold uppercase tracking-wide">
          BAB II.{" "}
          <EditableText
            value={data.title || "UNDANGAN PENGADAAN LANGSUNG"}
            onChange={(val: string) => onUpdate({ ...data, title: val })}
            className="font-bold"
          />
        </h2>
        <div className="flex justify-end mt-2">
          <div className="border border-gray-800 px-3 py-1">
            <EditableText
              value={data.docNumber || "CONTOH"}
              onChange={(val: string) => onUpdate({ ...data, docNumber: val })}
              className="text-xs text-center"
              style={{ minWidth: "60px" }}
            />
          </div>
        </div>
      </div>

      <div className="text-xs italic text-center mb-3 text-gray-500">
        [Kop surat K/L/D/I]
      </div>

      <div className="flex justify-between items-start text-xs mb-4">
        <div className="flex-1">
          <div className="mb-1">
            <span>Nomor : </span>
            <EditableText
              value={data.letterNumber || ""}
              onChange={(val: string) =>
                onUpdate({ ...data, letterNumber: val })
              }
              className="border-b border-gray-400 px-1"
              style={{ minWidth: "150px" }}
              placeholder="___________"
            />
          </div>
          <div>Lampiran : 1 (satu) berkas</div>
        </div>
        <div className="text-right">
          <EditableText
            value={data.place || ""}
            onChange={(val: string) => onUpdate({ ...data, place: val })}
            className="border-b border-gray-400 text-right px-1"
            style={{ minWidth: "100px" }}
            placeholder="Tempat"
          />
          <span>, ____ </span>
          <EditableText
            value={data.date || ""}
            onChange={(val: string) => onUpdate({ ...data, date: val })}
            className="border-b border-gray-400 px-1"
            style={{ minWidth: "120px" }}
            placeholder="Bulan 20__"
          />
        </div>
      </div>

      <div className="text-xs mb-3">Kepada Yth.</div>
      <div className="text-xs mb-3">
        di{" "}
        <EditableText
          value={data.addressee || ""}
          onChange={(val: string) => onUpdate({ ...data, addressee: val })}
          className="border-b border-gray-400 px-1"
          style={{ minWidth: "300px" }}
          placeholder="_________________"
        />
      </div>
    </div>
  );
}

// Subject Component
function SubjectComponent({ data, onUpdate, onRemove }: any) {
  return (
    <div className="relative group mb-4">
      <button
        onClick={onRemove}
        className="absolute -right-3 -top-3 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
      >
        <Trash2 size={14} />
      </button>

      <div className="text-xs mb-3">
        <strong>Perihal :</strong>{" "}
        <EditableText
          value={
            data.subject ||
            "Pengadaan Langsung Penyedia Pekerjaan Jasa Lainnya Pejabat Pengadaan pada"
          }
          onChange={(val: string) => onUpdate({ ...data, subject: val })}
          className="inline"
          multiline
        />{" "}
        <EditableText
          value={data.agency || ""}
          onChange={(val: string) => onUpdate({ ...data, agency: val })}
          className="border-b border-gray-400 px-1"
          style={{ minWidth: "150px" }}
          placeholder="________"
        />{" "}
        [K/L/D/I]
      </div>

      <div className="text-xs mb-4">
        <EditableText
          value={
            data.intro ||
            "Dengan ini [permakluman/] Saudara kami undang untuk mengikuti proses Pengadaan Langsung Paket Pekerjaan Jasa Lainnya sesuai dengan data sebagai berikut:"
          }
          onChange={(val: string) => onUpdate({ ...data, intro: val })}
          multiline
          className="w-full"
        />
      </div>
    </div>
  );
}

// Work Package Component
function WorkPackageComponent({ data, onUpdate, onRemove }: any) {
  return (
    <div className="relative group mb-4">
      <button
        onClick={onRemove}
        className="absolute -right-3 -top-3 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
      >
        <Trash2 size={14} />
      </button>

      <div className="text-xs mb-2">
        <strong>1. Paket Pekerjaan</strong>
      </div>
      <div className="text-xs pl-4 space-y-1.5">
        <div className="flex">
          <span className="w-40">Nama paket pekerjaan</span>
          <span className="mr-2">:</span>
          <EditableText
            value={data.packageName || ""}
            onChange={(val: string) => onUpdate({ ...data, packageName: val })}
            className="border-b border-gray-400 flex-1 px-1"
            placeholder="___________"
          />
        </div>
        <div className="flex">
          <span className="w-40">Lingkup pekerjaan</span>
          <span className="mr-2">:</span>
          <EditableText
            value={data.workScope || ""}
            onChange={(val: string) => onUpdate({ ...data, workScope: val })}
            className="border-b border-gray-400 flex-1 px-1"
            placeholder="___________"
          />
        </div>
        <div className="flex">
          <span className="w-40">Nilai total HPS</span>
          <span className="mr-2">:</span>
          <span>Rp. </span>
          <EditableText
            value={data.hpsValue || ""}
            onChange={(val: string) => onUpdate({ ...data, hpsValue: val })}
            className="border-b border-gray-400 px-1"
            style={{ minWidth: "150px" }}
            placeholder="___________"
          />
          <span className="ml-2">(</span>
          <EditableText
            value={data.hpsText || ""}
            onChange={(val: string) => onUpdate({ ...data, hpsText: val })}
            className="border-b border-gray-400 flex-1 px-1"
            placeholder="terbilang"
          />
          <span>)</span>
        </div>
        <div className="flex">
          <span className="w-40">Sumber pendanaan</span>
          <span className="mr-2">:</span>
          <EditableText
            value={data.fundingSource || ""}
            onChange={(val: string) =>
              onUpdate({ ...data, fundingSource: val })
            }
            className="border-b border-gray-400 px-1"
            style={{ minWidth: "150px" }}
            placeholder="___________"
          />
          <span className="ml-2">Tahun Anggaran</span>
          <EditableText
            value={data.fiscalYear || ""}
            onChange={(val: string) => onUpdate({ ...data, fiscalYear: val })}
            className="border-b border-gray-400 px-1 ml-1"
            style={{ minWidth: "60px" }}
            placeholder="____"
          />
        </div>
      </div>
    </div>
  );
}

// Schedule Component
function ScheduleComponent({ data, onUpdate, onRemove }: any) {
  const [schedule, setSchedule] = useState(
    data.schedule || [
      { no: "a.", activity: "Pemasukan Dokumen Penawaran", date: "", time: "" },
      { no: "b.", activity: "Pembukaan Dokumen Penawaran", date: "", time: "" },
      {
        no: "c.",
        activity: "Klarifikasi Teknis dan Negosiasi Harga",
        date: "",
        time: "",
      },
      { no: "d.", activity: "Penandatanganan SPK", date: "", time: "" },
    ]
  );

  const scheduleColumns = [
    { key: "no", label: "No", width: "50px", align: "center" },
    { key: "activity", label: "Kegiatan", width: "auto" },
    {
      key: "date",
      label: "Hari/Tanggal",
      width: "150px",
      align: "center",
      placeholder: "___/___/___",
    },
    {
      key: "time",
      label: "Waktu",
      width: "100px",
      align: "center",
      placeholder: "s.d ___",
    },
  ];

  const handleScheduleUpdate = (newSchedule: any) => {
    setSchedule(newSchedule);
    onUpdate({ ...data, schedule: newSchedule });
  };

  return (
    <div className="relative group mb-4">
      <button
        onClick={onRemove}
        className="absolute -right-3 -top-3 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
      >
        <Trash2 size={14} />
      </button>

      <div className="text-xs mb-2">
        <strong>2. Pelaksanaan Pengadaan</strong>
      </div>
      <div className="text-xs pl-4 space-y-1.5 mb-3">
        <div className="flex">
          <span className="w-32">Tempat dan alamat</span>
          <span className="mr-2">:</span>
          <EditableText
            value={data.location || ""}
            onChange={(val: string) => onUpdate({ ...data, location: val })}
            className="border-b border-gray-400 flex-1 px-1"
            placeholder="[Ruang, Gedung, Lantai, Jalan, dst]"
          />
        </div>
        <div className="flex">
          <span className="w-32">Telepon/Fax</span>
          <span className="mr-2">:</span>
          <EditableText
            value={data.phone || ""}
            onChange={(val: string) => onUpdate({ ...data, phone: val })}
            className="border-b border-gray-400 flex-1 px-1"
            placeholder="___________"
          />
        </div>
        <div className="flex">
          <span className="w-32">Website</span>
          <span className="mr-2">:</span>
          <EditableText
            value={data.website || ""}
            onChange={(val: string) => onUpdate({ ...data, website: val })}
            className="border-b border-gray-400 flex-1 px-1"
            placeholder="___________"
          />
        </div>
      </div>

      <div className="text-xs mb-2">
        <EditableText
          value={
            data.note1 ||
            "Saudara diminta untuk memasukan penawaran administrasi, teknis dan harga, secara langsung sesuai dengan tahapan pelaksanaan sebagai berikut:"
          }
          onChange={(val: string) => onUpdate({ ...data, note1: val })}
          multiline
          className="w-full"
        />
      </div>

      <EditableTable
        rows={schedule}
        columns={scheduleColumns}
        onUpdate={handleScheduleUpdate}
        className="text-xs border border-gray-800"
      />

      <div className="text-xs mt-2">
        <EditableText
          value={
            data.note2 ||
            "Apabila Saudara butuh keterangan dan penjelasan lebih lanjut, dapat menghubungi Pejabat Pengadaan sesuai alamat tersebut di atas sampai dengan batas akhir pemasukan Dokumen Penawaran."
          }
          onChange={(val: string) => onUpdate({ ...data, note2: val })}
          multiline
          className="w-full"
        />
      </div>
    </div>
  );
}

// Signature Component
function SignatureComponent({ data, onUpdate, onRemove }: any) {
  return (
    <div className="relative group mt-8">
      <button
        onClick={onRemove}
        className="absolute -right-3 -top-3 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
      >
        <Trash2 size={14} />
      </button>

      <div className="flex justify-end">
        <div className="text-xs text-center w-64">
          <div className="mb-1">
            <EditableText
              value={data.signerTitle1 || "Standar Dokumen Pengadaan"}
              onChange={(val: string) =>
                onUpdate({ ...data, signerTitle1: val })
              }
              className="block"
            />
          </div>
          <div className="mb-1">
            <EditableText
              value={data.signerTitle2 || "Jasa Lainnya"}
              onChange={(val: string) =>
                onUpdate({ ...data, signerTitle2: val })
              }
              className="block"
            />
          </div>
          <div className="mb-12">
            <EditableText
              value={data.signerTitle3 || "(Metode Pengadaan Langsung)"}
              onChange={(val: string) =>
                onUpdate({ ...data, signerTitle3: val })
              }
              className="block"
            />
          </div>
          <div className="border-b border-gray-800 mb-1">
            <EditableText
              value={data.signerName || ""}
              onChange={(val: string) => onUpdate({ ...data, signerName: val })}
              className="block px-1"
              placeholder="Nama Penandatangan"
            />
          </div>
          <div className="text-xs">
            <EditableText
              value={data.signerPosition || ""}
              onChange={(val: string) =>
                onUpdate({ ...data, signerPosition: val })
              }
              className="block px-1"
              placeholder="Jabatan"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Document Canvas
function DocumentCanvas({ components, onRemove, onUpdate }: any) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const componentType = e.dataTransfer.getData("componentType");
    if (componentType) {
      const event = new CustomEvent("addComponent", {
        detail: { type: componentType },
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex-1 bg-gray-200 p-8 min-h-screen overflow-auto transition-colors ${
        isDragOver ? "bg-blue-100" : ""
      }`}
    >
      <div
        className={`max-w-[21cm] mx-auto bg-white shadow-2xl transition-all ${
          isDragOver ? "ring-4 ring-blue-400" : ""
        }`}
        style={{ minHeight: "29.7cm", padding: "2.5cm 2cm" }}
      >
        {components.length === 0 ? (
          <div className="text-center py-32 text-gray-400">
            <FileText size={64} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium">
              Drag komponen dari sidebar untuk membuat dokumen
            </p>
            <p className="text-sm mt-2">
              Setelah ditambahkan, klik teks apapun untuk mengedit langsung
            </p>
          </div>
        ) : (
          <div className="space-y-0">
            {components.map((component: any) => {
              const props = {
                key: component.id,
                data: component.data,
                onRemove: () => onRemove(component.id),
                onUpdate: (newData: any) => onUpdate(component.id, newData),
              };

              switch (component.type) {
                case "header":
                  return <HeaderComponent {...props} />;
                case "subject":
                  return <SubjectComponent {...props} />;
                case "work-package":
                  return <WorkPackageComponent {...props} />;
                case "schedule":
                  return <ScheduleComponent {...props} />;
                case "signature":
                  return <SignatureComponent {...props} />;
                default:
                  return null;
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// Main App
export default function DocumentBuilder() {
  const [components, setComponents] = useState<any[]>([]);

  const availableComponents = [
    {
      id: "header",
      type: "header",
      label: "Header Dokumen",
      icon: <FileText size={20} />,
      defaultData: {},
    },
    {
      id: "subject",
      type: "subject",
      label: "Perihal & Intro",
      icon: <AlignLeft size={20} />,
      defaultData: {},
    },
    {
      id: "work-package",
      type: "work-package",
      label: "Paket Pekerjaan",
      icon: <DollarSign size={20} />,
      defaultData: {},
    },
    {
      id: "schedule",
      type: "schedule",
      label: "Jadwal Tender",
      icon: <TableIcon size={20} />,
      defaultData: {},
    },
    {
      id: "signature",
      type: "signature",
      label: "Tanda Tangan",
      icon: <FileSignature size={20} />,
      defaultData: {},
    },
  ];

  useEffect(() => {
    const handleAddComponent = (e: any) => {
      const { type } = e.detail;
      const item = availableComponents.find((c) => c.type === type);

      if (item) {
        setComponents((prev) => [
          ...prev,
          {
            id: `${item.type}-${Date.now()}`,
            type: item.type,
            data: item.defaultData,
          },
        ]);
      }
    };

    window.addEventListener("addComponent", handleAddComponent);
    return () => window.removeEventListener("addComponent", handleAddComponent);
  }, []);

  const handleRemove = (id: string) => {
    setComponents(components.filter((c) => c.id !== id));
  };

  const handleUpdate = (id: string, newData: any) => {
    setComponents(
      components.map((c) => (c.id === id ? { ...c, data: newData } : c))
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-auto flex flex-col">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2 text-gray-800">
            Komponen Dokumen
          </h2>
          <p className="text-xs text-gray-500 mb-6">
            Drag & drop + Edit langsung
          </p>

          <div className="space-y-3">
            {availableComponents.map((item) => (
              <PaletteItem key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-sm text-blue-900 mb-2">
              💡 Cara Pakai
            </h3>
            <ul className="text-xs text-blue-700 space-y-1.5">
              <li>
                • <strong>Drag</strong> komponen ke dokumen
              </li>
              <li>
                • <strong>Klik</strong> teks untuk edit langsung
              </li>
              <li>
                • <strong>Enter</strong> untuk konfirmasi
              </li>
              <li>
                • <strong>Hover</strong> untuk hapus komponen
              </li>
              <li>
                • <strong>Tabel</strong> bisa tambah/hapus baris
              </li>
            </ul>
          </div>
        </div>

        {components.length > 0 && (
          <div className="space-y-2 mt-4">
            <button
              onClick={() => window.print()}
              className="w-full p-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download size={16} />
              Print / Export PDF
            </button>
            <button
              onClick={() => confirm("Hapus semua?") && setComponents([])}
              className="w-full p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
            >
              Hapus Semua
            </button>
          </div>
        )}
      </div>

      <DocumentCanvas
        components={components}
        onRemove={handleRemove}
        onUpdate={handleUpdate}
      />

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .max-w-\\[21cm\\], .max-w-\\[21cm\\] * { visibility: visible; }
          .max-w-\\[21cm\\] {
            position: absolute;
            left: 0;
            top: 0;
            width: 21cm;
            box-shadow: none !important;
          }
          button { display: none !important; }
          .hover\\:bg-blue-50:hover { background: transparent !important; }
        }
      `}</style>
    </div>
  );
}
