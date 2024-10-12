import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './pages/Signup';
import MyServices from './pages/serviceProvider/MyServices';
import Settings from './pages/serviceProvider/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import MyService from './pages/serviceProvider/MyService';
import Service from './pages/consumer/Service';
import Services from './pages/consumer/Services';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<SignUp/>}/>
        <Route path='serviceprovider/services' element={<ProtectedRoute allowedRoles={['serviceProvider']}>
          <MyServices/>
        </ProtectedRoute>}/>
        <Route path='serviceprovider/services/:id' element={<ProtectedRoute allowedRoles={['serviceProvider']}>
          <MyService/>
        </ProtectedRoute>}/>
        <Route path='serviceprovider/settings' element={<ProtectedRoute allowedRoles={['serviceProvider']}>
          <Settings/>
        </ProtectedRoute>}/>
        <Route path='consumer/services' element={<ProtectedRoute allowedRoles={['consumer']}>
          <Services/>
        </ProtectedRoute>}/>
        <Route path='consumer/services/:id' element={<ProtectedRoute allowedRoles={['consumer']}>
          <Service/>
        </ProtectedRoute>}/>
        <Route path='consumer/settings' element={<ProtectedRoute allowedRoles={['consumer']}>
          <Settings/>
        </ProtectedRoute>}/>
      </Route>
    )
  );
  return (
    <>
    <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
      <RouterProvider router={router}/>
    </>
  )
}

export default App
