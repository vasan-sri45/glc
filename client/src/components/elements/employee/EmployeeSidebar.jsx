// import React, { useEffect, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Mail, Users, Phone } from 'lucide-react';
// import { fetchPersonalInfo } from '../../../store/slices/personal/personalSlice';

// // Optional: selector for auth to ensure token is ready before fetch
// // const selectAuthReady = (state) => Boolean(state.auth?.token);

// const EmployeeSidebar = () => {
//   const dispatch = useDispatch();
//   const { status, data: raw, error } = useSelector((s) => s.personalInfo);
//   // const authReady = useSelector(selectAuthReady);

//   // Normalize the shape defensively: accept {data:{...}} or {...}
//   const employee = useMemo(() => {
//     if (!raw) return null;
//     const obj = raw?.data && typeof raw.data === 'object' ? raw.data : raw;
//     return obj && Object.keys(obj).length ? obj : null;
//   }, [raw]);

//   // Fetch when idle, and when we have previously failed (e.g., token race)
//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchPersonalInfo());
//     }
//   }, [status, dispatch]);

//   // If you have auth tokens, gate the fetch on auth readiness:
//   // useEffect(() => {
//   //   if (authReady && status === 'idle') {
//   //     dispatch(fetchPersonalInfo());
//   //   }
//   // }, [authReady, status, dispatch]);

//   // Retry once after a failure—common after login when token becomes available
//   useEffect(() => {
//     if (status === 'failed') {
//       const t = setTimeout(() => dispatch(fetchPersonalInfo()), 400); // small backoff
//       return () => clearTimeout(t);
//     }
//   }, [status, dispatch]);

//   const isLoading = status === 'loading' || (status === 'idle' && !employee);
//   const showSkeleton = isLoading && !employee;

//   if (showSkeleton) {
//     return (
//       <div className="lg:col-span-1">
//         <div className="bg-blue-50 rounded-xl p-6 text-center animate-pulse">
//           <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 border-4"></div>
//           <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
//           <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-6"></div>
//           <div className="space-y-4 text-left">
//             <div className="h-5 bg-gray-300 rounded w-full"></div>
//             <div className="h-5 bg-gray-300 rounded w-full"></div>
//             <div className="h-5 bg-gray-300 rounded w-full"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // If still no data but not loading, show a compact fallback with error
//   if (!employee) {
//     return (
//       <div className="lg:col-span-1">
//         <div className="bg-blue-50 rounded-xl p-6 text-center">
//           <p className="text-gray-600">No profile data available.</p>
//           {error ? <p className="text-red-600 text-sm mt-2">{typeof error === 'string' ? error : 'Failed to load'}</p> : null}
//         </div>
//       </div>
//     );
//   }

//   const name = employee?.name ?? '—';
//   const empId = employee?.employee_id?.empId ?? '—';
//   const email = employee?.employee_id?.emailId ?? '—';
//   const department = employee?.department ?? '—';
//   const emergencyPhone = employee?.emergencyContactNumber ?? '—';
//   const joined = employee?.createdAt ? new Date(employee.createdAt).toLocaleDateString() : '—';

//   return (
//     <div className="lg:col-span-1">
//       <div className="bg-blue-50 rounded-xl p-6 text-center">
//         <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 border-4 border-white shadow-md" />
//         <h2 className="text-xl font-bold text-gray-900 mb-2">
//           {name} {empId !== '—' ? `(${empId})` : ''}
//         </h2>
//         <p className="text-gray-600 mb-6">Joined: {joined}</p>

//         <div className="space-y-4 text-left">
//           <div className="flex items-center space-x-3">
//             <Mail size={18} className="text-gray-500" />
//             <span className="text-gray-700 break-all">{email}</span>
//           </div>
//           <div className="flex items-center space-x-3">
//             <Users size={18} className="text-gray-500" />
//             <span className="text-gray-700">{department}</span>
//           </div>
//           <div className="flex items-center space-x-3">
//             <Phone size={18} className="text-gray-500" />
//             <span className="text-gray-700">{emergencyPhone}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeSidebar;


import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Users, Phone, AlertCircle } from 'lucide-react';
import { fetchPersonalInfo } from '../../../store/slices/personal/personalSlice';

const EmployeeSidebar = () => {
  const dispatch = useDispatch();
  const { status, data: raw, error } = useSelector((s) => s.personalInfo);
  
  // Ref to prevent infinite API calls
  const fetchAttempted = useRef(false);
  const retryCount = useRef(0);
  const maxRetries = 2;

  // Normalize the shape defensively
  const employee = useMemo(() => {
    if (!raw) return null;
    const obj = raw?.data && typeof raw.data === 'object' ? raw.data : raw;
    return obj && Object.keys(obj).length > 0 ? obj : null;
  }, [raw]);

  // Initial fetch - only once when component mounts
  useEffect(() => {
    if (!fetchAttempted.current && status === 'idle') {
      fetchAttempted.current = true;
      dispatch(fetchPersonalInfo());
    }
  }, [status, dispatch]);

  // Limited retry logic for failed requests
  useEffect(() => {
    if (status === 'failed' && retryCount.current < maxRetries) {
      const timer = setTimeout(() => {
        retryCount.current += 1;
        dispatch(fetchPersonalInfo());
      }, 1000 * retryCount.current); // Exponential backoff

      return () => clearTimeout(timer);
    }
  }, [status, dispatch]);

  const isLoading = status === 'loading';
  const showSkeleton = isLoading && !employee;

  if (showSkeleton) {
    return (
      <div className="lg:col-span-1">
        <div className="bg-blue-50 rounded-xl p-6 text-center animate-pulse">
          <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 border-4"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-6"></div>
          <div className="space-y-4 text-left">
            <div className="h-5 bg-gray-300 rounded w-full"></div>
            <div className="h-5 bg-gray-300 rounded w-full"></div>
            <div className="h-5 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // If no employee data and not loading
  if (!employee && status !== 'loading') {
    const errorMessage = typeof error === 'string' 
      ? error 
      : error?.message || 'Unable to load profile data';

    return (
      <div className="lg:col-span-1">
        <div className="bg-blue-50 rounded-xl p-6 text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 border-4 border-white shadow-md flex items-center justify-center">
            <AlertCircle size={32} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Profile Data</h2>
          <p className="text-gray-600 mb-4">
            {status === 'failed' ? 'Failed to load profile information' : 'No profile information available'}
          </p>
          
          {/* {status === 'failed' && (
            <div className="text-left bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-600 text-sm">{errorMessage}</p>
            </div>
          )} */}
          
          <button
            onClick={() => {
              retryCount.current = 0;
              dispatch(fetchPersonalInfo());
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  // Extract data with fallbacks
  const name = employee?.name || 'Unknown User';
  const empId = employee?.employee_id?.empId || employee?.empId || '—';
  const email = employee?.employee_id?.emailId || employee?.email || '—';
  const department = employee?.department || '—';
  const emergencyPhone = employee?.emergencyContactNumber || '—';
  const joined = employee?.createdAt 
    ? new Date(employee.createdAt).toLocaleDateString() 
    : '—';

  return (
    <div className="lg:col-span-1">
      <div className="bg-blue-50 rounded-xl p-6 text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 border-4 border-white shadow-md flex items-center justify-center">
          <span className="text-white font-bold text-2xl">
            {name.charAt(0).toUpperCase()}
          </span>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {name} {empId !== '—' && `(${empId})`}
        </h2>
        <p className="text-gray-600 mb-6">Joined: {joined}</p>

        <div className="space-y-4 text-left">
          <div className="flex items-center space-x-3">
            <Mail size={18} className="text-gray-500 flex-shrink-0" />
            <span className="text-gray-700 break-all text-sm">{email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Users size={18} className="text-gray-500 flex-shrink-0" />
            <span className="text-gray-700">{department}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone size={18} className="text-gray-500 flex-shrink-0" />
            <span className="text-gray-700">{emergencyPhone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSidebar;