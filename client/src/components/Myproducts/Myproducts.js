
import React, { useEffect,useState } from 'react'
import Navbar from '../Navbar/Navbar'
import axios from "axios"
import "./Myprod.css"
const Myproducts = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token")
  const [data,SetData] = useState([])
  useEffect(()=>
  {
    const FetchProducts = async()=>
      {
        console.log(token)
        try 
        {
          const res = await axios.get(`http://localhost:7000/api/Prod/myProd/${userId}`,
            {
              headers:
              {
                Authorization: `Bearer ${token}`,
                "Content-Type":"application/json"
    
              }
            }
          );
          SetData(res.data);
          console.log(res.data);
        }
        catch(err)
        {
          console.log(err);
          
        }
      }
      FetchProducts();
  },[])
  return (
    <div className='myproduct-container'>
      {
        data.map((prod)=> (
          <div className='myprod'>
         
          <img src={prod.Photo1} height={200} width={200} />
          <h2>{prod.Description}</h2>
        <div className='prices'>
          <p className='prev-price'>{`${prod.PrevPrice}INR`}</p>
          <p className='price'>{prod.Price}INR</p>
          </div>
          <p className='stock'>STOCKS:{prod.Stock}</p>
      </div>
        ))
      }
      
    </div>
  )
}

export default Myproducts
