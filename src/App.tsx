import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Categories from './pages/Categories';
import Expenses from './pages/Expenses';
import { useAppSelector } from './redux/hooks';

function App() {
  const {token} = useAppSelector(state => state.auth)
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path='login' element={<Login/>}/>
        <Route path='signUp' element={<SignUp/>}/>
        <Route index element={token?<Dashboard/>:<Login/>}/>
        <Route path='categories' element={token?<Categories/>:<Login/>}/>
        <Route path='expenses' element={token?<Expenses/>:<Login/>}/>
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
