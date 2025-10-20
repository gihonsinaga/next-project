// "use client";

// import { useRouter } from "next/navigation";
// import { useState, FormEvent } from "react";
// import { login } from "@/services/authService";
// import { useAuth } from "@/hooks/useAuth";

// export default function LoginPage() {
//   const router = useRouter();
//   const { isChecking } = useAuth();

//   const [username, setusername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       await login(username, password);

//       router.push("/stores/issue_requisition");
//     } catch (err) {
//       console.error("Login Error!", err);
//       setError("Invalid username or password. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isChecking) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <div
//         className="hidden lg:flex w-1/2 items-center justify-center bg-gray-800 bg-cover bg-center"
//         style={{ backgroundImage: "url('/images/modern-agriculture.jpg')" }}
//       >
//         <div className="absolute inset-0 bg-black/60 lg:relative lg:bg-transparent">
//           <div className="flex h-full items-center justify-center">
//             <div className="max-w-md text-center p-8">
//               <h1 className="text-4xl font-bold text-white">
//                 Welcome Back to <span className="text-green-400">Harvest</span>
//               </h1>
//               <p className="mt-4 text-gray-300">
//                 Streamlining agri-business operations with modern technology.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
//         <div className="max-w-md w-full">
//           <div>
//             <h2 className="text-3xl font-bold text-gray-900 text-center">
//               Sign in to your account
//             </h2>
//           </div>

//           <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//             <div className="rounded-md shadow-sm -space-y-px">
//               <div>
//                 <label htmlFor="username" className="sr-only">
//                   Username
//                 </label>
//                 <input
//                   id="username"
//                   name="username"
//                   type="text"
//                   autoComplete="username"
//                   required
//                   disabled={isLoading}
//                   value={username}
//                   onChange={(e) => setusername(e.target.value)}
//                   className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
//                   placeholder="Username or username"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password-input" className="sr-only">
//                   Password
//                 </label>
//                 <input
//                   id="password-input"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   disabled={isLoading}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
//                   placeholder="Password"
//                 />
//               </div>
//             </div>

//             {error && (
//               <p className="text-sm text-red-600 text-center">{error}</p>
//             )}

//             <div>
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400"
//               >
//                 {isLoading ? "Signing in..." : "Sign In"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/actions/authActions";
import { AppDispatch, RootState } from "@/redux/store";

export default function LoginPage() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  // Ambil state dari Redux store
  const { isLoading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Handler untuk submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  // Efek untuk redirect jika sudah terautentikasi
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/stores/issue_requisition");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Bagian Kiri dengan Gambar Latar */}
      <div
        className="hidden lg:flex w-1/2 items-center justify-center bg-gray-800 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/modern-agriculture.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60 lg:relative lg:bg-transparent">
          <div className="flex h-full items-center justify-center">
            <div className="max-w-md text-center p-8">
              <h1 className="text-4xl font-bold text-white">
                Welcome Back to <span className="text-green-400">Harvest</span>
              </h1>
              <p className="mt-4 text-gray-300">
                Streamlining agri-business operations with modern technology.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Kanan dengan Form Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 text-center">
              Sign in to your account
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  disabled={isLoading}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="password-input" className="sr-only">
                  Password
                </label>
                <input
                  id="password-input"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  disabled={isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            {/* Tampilkan pesan error dari Redux state */}
            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
