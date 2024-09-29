import React, { useState } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    MenuItem,
    Select,
} from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [profile, setProfile] = useState(userId);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        setProfile(value);
        if (value === "logout") {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("id");
            navigate("/login", { replace: true }); 
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='fixed'>
                <Toolbar>
                    <Typography
                        sx={{
                            padding: "25px",
                            fontWeight: "600",
                            fontSize: "27px"
                        }}
                    >
                        AmaFlip
                    </Typography>
                    <Typography
                        sx={{
                            padding: "25px",
                            fontWeight: "400",
                            fontSize: "20px"
                        }}
                    >
                        <Link to={'/myproducts'} style={{
                            textDecoration: "none",
                            color: "white"
                        }}>
                            MYProducts
                        </Link>
                    </Typography>
                    <Typography
                        sx={{
                            padding: "25px",
                            fontWeight: "400",
                            fontSize: "20px"
                        }}
                    >
                        <Link
                            to={'/products'}
                            style={{
                                textDecoration: "none",
                                color: "white"
                            }}
                        >
                            AddProduct
                        </Link>
                    </Typography>
                    <Select
                        value={profile}
                        onChange={handleChange}
                        sx={{
                            width: "200px",
                            height: "60px",
                            border: "0.5px solid black",
                            marginLeft: "10px",
                        }}
                    >
                        <MenuItem value={userId}>
                            {userId}
                        </MenuItem>
                        <MenuItem value={"logout"}>
                            <Link to={"/login"}>
                                LOGOUT
                            </Link>
                        </MenuItem>
                    </Select>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
