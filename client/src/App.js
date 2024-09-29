import { Route, Routes } from "react-router-dom";
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import AddProduct from './pages/AddProduct';
import Myproducts from './components/Myproducts/Myproducts';

function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="App">
      <Routes>
        {token ? (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/products' element={<AddProduct />} />
            <Route path='/myproducts' element={<Myproducts />} />
          </>
        ) : (
         <>
           <Route  path='/' element={<Signup />} exact />
           <Route path='/login' element={<Login />} />
         </>
        )}
      </Routes>
    </div>
  );
}

export default App;
