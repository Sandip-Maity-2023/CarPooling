// import React from 'react'
// import { Navigate, Route, Routes } from 'react-router-dom'
// import Start from './pages/Start'
// import UserLogin from './pages/UserLogin'
// import UserSignup from './pages/UserSignup'
// import Captainlogin from './pages/Alogin'
// import CaptainSignup from './pages/Asignup'
// import Home from './pages/Home'
// import UserProtectWrapper from './pages/Userprotectwrapper'
// import UserLogout from './pages/Userlogout'
// import CaptainHome from './pages/Ahome'
// import CaptainProtectWrapper from './pages/Aprotectwrapper'
// import CaptainLogout from './pages/Alogout'
// import Riding from './pages/Ariding'
// import CaptainRiding from './pages/Ariding'
// import 'remixicon/fonts/remixicon.css'
// import AdminDashboard from './pages/AdminDashboard'

// const App = () => {

//   return (
//     <div>
//       <Routes>
//         <Route path='/' element={<Start />} />
//         <Route path='/login' element={<UserLogin />} />
//         <Route path='/riding' element={<Riding />} />
//         <Route path='/captain-riding' element={<CaptainRiding />} />

//         <Route path='/signup' element={<UserSignup />} />
//         <Route path='/captain-login' element={<Captainlogin />} />
//         <Route path='/captain-signup' element={<CaptainSignup />} />
//         <Route path='/home'
//           element={
//             <UserProtectWrapper>
//               <Home />
//             </UserProtectWrapper>
//           } />
//         <Route path='/user/logout'
//           element={<UserProtectWrapper>
//             <UserLogout />
//           </UserProtectWrapper>
//           } />
//         <Route path='/captain-home' element={
//           <CaptainProtectWrapper>
//             <CaptainHome />
//           </CaptainProtectWrapper>

//         } />
//         <Route path='/captain/logout' element={
//           <CaptainProtectWrapper>
//             <CaptainLogout />
//           </CaptainProtectWrapper>
//         } />
//         <Route path='*' element={<Navigate to='/' replace />} />
//         <Route path='/admin' element={<AdminDashboard />} />
//       </Routes>
//     </div>
//   )
// }

// export default App
