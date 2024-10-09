import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css'
import Login from './pages/Login';


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path='login' element={<Login/>}/>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
