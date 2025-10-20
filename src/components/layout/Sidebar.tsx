"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/redux/actions/authActions";
import { RootState, AppDispatch } from "@/redux/store";

// Interface untuk item navigasi
interface NavItem {
  name: string;
  href: string;
  subItems?: NavItem[];
}

// Data navigasi
const navigation: NavItem[] = [
  {
    name: "Materials Management",
    href: "#",
    subItems: [
      {
        name: "Inventory",
        href: "#",
        subItems: [
          {
            name: "Transactions",
            href: "#",
            subItems: [
              {
                name: "Stores Issue Requisition (SIR)",
                href: "#",
                subItems: [
                  {
                    name: "Issue Requisition",
                    href: "/stores/issue_requisition",
                  },
                  {
                    name: "Issue Requisition Sanction",
                    href: "/stores/issue_requisition_sanction",
                  },
                  { name: "SIR Closure", href: "/stores/sir_closure" },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

// Komponen Ikon Panah
const ArrowIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    className={`w-4 h-4 transition-transform duration-200 ${
      isOpen ? "rotate-90" : "rotate-0"
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5l7 7-7 7"
    ></path>
  </svg>
);

// Komponen Navigasi Rekursif
const RecursiveNavLink = ({ item }: { item: NavItem }) => {
  const pathname = usePathname();
  const isParent = !!item.subItems && item.subItems.length > 0;

  const [isOpen, setIsOpen] = useState(
    item.subItems?.some((sub) => pathname.startsWith(sub.href)) || false
  );

  useEffect(() => {
    if (item.subItems?.some((sub) => pathname.startsWith(sub.href))) {
      setIsOpen(true);
    }
  }, [pathname, item.subItems]);

  const handleToggle = () => {
    if (isParent) {
      setIsOpen(!isOpen);
    }
  };

  const isActive = !isParent && pathname === item.href;

  if (isParent) {
    return (
      <li>
        <button
          onClick={handleToggle}
          className="w-full flex items-center justify-between pl-4 pr-2 py-3 text-sm text-white "
        >
          <span>{item.name}</span>
          <ArrowIcon isOpen={isOpen} />
        </button>
        {isOpen && (
          <ul className="pl-4 mt-1 space-y-1">
            {item.subItems?.map((subItem) => (
              <RecursiveNavLink key={subItem.name} item={subItem} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.href}
        className={`block pl-4 pr-2 py-3 text-sm rounded-md ${
          isActive ? "bg-white text-blue-900 font-bold" : "text-white"
        }`}
      >
        {item.name}
      </Link>
    </li>
  );
};

// Komponen Utama Sidebar
export default function Sidebar() {
  const dispatch: AppDispatch = useDispatch();

  // Ambil data user dari Redux store
  const { user } = useSelector((state: RootState) => state.auth);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // Efek untuk menutup dropdown saat klik di luar area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <aside className="w-72 flex flex-col flex-shrink-0 bg-blue-900 text-white p-4">
      {/* Logo dan Navigasi */}
      <div className="flex-grow">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-center">Harvest</h1>
          <p className="text-xs text-center text-gray-400">Version: 2.0</p>
        </div>
        <nav className="overflow-y-auto">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <RecursiveNavLink key={item.name} item={item} />
            ))}
          </ul>
        </nav>
      </div>

      {/* Profil Pengguna dan Logout */}
      <div className="mt-auto relative" ref={profileRef}>
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="w-full flex items-center justify-between p-3 text-sm cursor-pointer rounded-md hover:bg-blue-800"
        >
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
              <span className="text-blue-900 font-bold">
                {user?.firstName?.charAt(0).toUpperCase()}
              </span>
            </div>
            <span>{user?.firstName || user?.username || "User"}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu untuk Logout */}
        {isProfileOpen && (
          <div className="absolute bottom-full mb-2 w-full bg-white rounded-md shadow-lg py-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
