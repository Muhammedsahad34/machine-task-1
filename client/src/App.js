import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import UserDetails from './Context/UserContext';
import AddProductPage from './Pages/AddProductPage';
import CartPage from './Pages/CartPage';
import ViewProductsPage from './Pages/ViewProductsPage';
import EditProductPage from './Pages/EditProductPage';
function App() {
  return (
    <>
    <UserDetails>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/signup' element={<SignUpPage/>} />
          <Route path='/add-product' element={<AddProductPage/>} />
          <Route path='/cart' element={<CartPage/>} />
          <Route path='/Edit' element={<ViewProductsPage/>} />
          <Route path='/edit-Product/:id' element={<EditProductPage/>} />
        </Routes>
      </Router>
    </UserDetails>
    </>
  );
}

export default App;
