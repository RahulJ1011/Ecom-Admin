
import React from "react";
import {useState} from "react"
import {
  Avatar,
  Box,
  Container,
  
  CssBaseline,
  
  
  TextField,
  Typography,
  
  Button,
} from "@mui/material";
import {useNavigate} from "react-router-dom"
import axios from "axios"
const Signup = () => {
    const [data, setData] = useState({
        UserName:"",
        userId:"",
        Email: "",
        Password: ""
      });
      const handleChange = (e)=>
        {
            const {name,value}= e.target;
            setData((prev)=>
            {
                return{
                    ...prev,
                    [name]:value
                }
            })
        }
        const navigate = useNavigate()
        const handleSubmit = async(e)=>
            {
                e.preventDefault();
                const response = await axios.post("http://localhost:7000/api/auth/register",

                    data,
                    {
                        withCredentials:true
                    }
                );
                console.log(response);
                navigate("/login");
            }
  return (
   <form onSubmit={handleSubmit}>
        <Container
         sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
            <CssBaseline />
            <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "4em",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            textAlign: "center",
            borderRadius: "15px",
            boxShadow:
              "0px 4px 16px rgba(17, 17, 26, 0.1), 0px 8px 24px rgba(17, 17, 26, 0.1), 0px 16px 56px rgba(17, 17, 26, 0.1)",
          }}
        >
            <Typography>
                Register
            </Typography>
            <TextField
                type="text"
                placeholder="Enter Your  UserName"
                name="UserName"
                required
                label="Enter your UserName"
                value={data.UserName}
                onChange={handleChange}
                sx={{
                  borderRadius: "5px",
                }}
            />
            <TextField
            type="text"
            placeholder="Enter Your Email"
            name="Email"
            required
            label="Enter your Email"
            value={data.Email}
            onChange={handleChange}
            sx={{
              borderRadius: "5px",
            }}
            />
            <TextField
            type="text"
            placeholder="Enter Your Password"
            name="Password"
            required
            label="Enter your Password"
            value={data.Password}
            onChange={handleChange}
            sx={{
              borderRadius: "5px",
            }}
            />
            <TextField
            type="text"
            placeholder="Enter Your UserId"
            name="userId"
            required
            label="Enter your UserId"
            value={data.userId}
            onChange={handleChange}
            sx={{
              borderRadius: "5px",
            }}
            />
             <Button
            type="submit"
            variant="contained"
            sx={{
              "&:hover": {
                backgroundColor: "black",
              },
            }}
          >
            REGISTER
          </Button>
        </Box>

        </Container>
   </form>
  )
}

export default Signup
