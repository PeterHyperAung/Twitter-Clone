import { Box, OutlinedInput, Button, Typography, Alert } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import React from 'react'
import { login, verify } from '../apiCalls/apiCalls';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const handle = useRef();
    const password = useRef();
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const { setAuth, setAuthUser } = useContext(AuthContext);

    return (
        <Box sx={{ my: 2, mx: { lg: 10, md: 5, sm: 5, xs: 2 } }}>
            <Typography variant='h4' sx={{ my: 4 }}>
                Login
            </Typography>

            {location.state && <Alert
                severity='success'
                sx={{ mb: 4 }}>
                {location.state}
            </Alert>}

            {err && <Alert severity='error' sx={{ mb: 4 }}>{errMsg}</Alert>}

            <form action="" onSubmit={e => {
                e.preventDefault();

                (async () => {
                    const token = await login(handle.current.value,
                        password.current.value);

                    if (token) {
                        setAuth(true)

                        const user = await verify();
                        setAuthUser(user);

                        navigate('/');
                    } else {
                        setErr(true);
                        setErrMsg('Handle or password incorrect');
                    }
                })()

            }}>
                <OutlinedInput placeholder='Handle' fullWidth sx={{ mb: 2 }} inputRef={handle} />
                <OutlinedInput type="Password" placeholder='password' fullWidth sx={{ mb: 2 }} inputRef={password} />
                <Button variant="contained" type="submit">Login</Button>
            </form>
        </Box >
    )
}

export default Login