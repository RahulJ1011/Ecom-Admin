import React, { useState } from 'react';
import {
    Box,
    Container,
    CssBaseline,
    TextField,
    Typography,
    Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        Email: "",
        Password: "",
        userId: "" // This might not be necessary for login form
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:7000/api/auth/login", data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const { token, userId, id } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("id", id);
            navigate("/products");
        } catch (error) {
            console.error("Login error:", error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="Email"
                        autoComplete="email"
                        autoFocus
                        value={data.Email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="Password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={data.Password}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="userId"
                        label="userId"
                        type="text"
                        id="userId"
                        autoComplete="userId"
                        value={data.userId}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
