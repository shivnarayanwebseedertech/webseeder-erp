// export default function CreateCompanyPage() {
//   const [gstin, setGstin] = useState('');
//   const [touched, setTouched] = useState(false);

//   const isValid = gstin.trim().length === 15;
//   const showError = touched && !isValid;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setTouched(true);
//     if (isValid) {
//       // proceed to create company
//     }
//   };

//   return (
//     <div className="min-h-screen bg-blue-50">
//       <NavBar />
//       <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-lg p-6">
//         <h2 className="text-xl font-semibold mb-2">Enter Your GST Number</h2>
//         <p className="text-gray-500 mb-4">Easy way to create company by selecting appropriate options</p>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="relative">
//             <label htmlFor="gstin" className="block text-sm font-medium text-gray-700">
//               GSTIN<span className="text-red-500">*</span>
//             </label>
//             <input
//               id="gstin"
//               name="gstin"
//               type="text"
//               value={gstin}
//               onChange={(e) => setGstin(e.target.value)}
//               onBlur={() => setTouched(true)}
//               placeholder="Enter 15 digit GSTIN number"
//               className={`mt-1 block w-full pr-10 border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 
//                 ${showError ? 'border-red-500 text-red-600' : 'border-gray-300'}`}
//             />
//             {showError && (
//               <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
//                 <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M18 10c0 4.418-3.582 8-8 8s-8-3.582..." clipRule="evenodd" />
//                 </svg>
//               </div>
//             )}
//             {showError && <p className="mt-1 text-sm text-red-600">Is required!</p>}
//           </div>

//           <button
//             type="submit"
//             className="w-full inline-flex justify-center items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
//           >
//             Create Company
//           </button>
//         </form>
//         <div className="mt-4">
//           <a href="#" className="text-blue-600 hover:underline inline-flex items-center">
//             I don’t have a GST number <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path d="M9 5l7 7-7 7" />
//             </svg>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }
