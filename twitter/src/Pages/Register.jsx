import { Box, OutlinedInput, Button, Alert } from '@mui/material'
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { register } from '../apiCalls/apiCalls';

const Register = () => {
    const navigate = useNavigate();
    const name = useRef();
    const handle = useRef();
    const password = useRef();
    const profile = useRef();
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    return (
        <Box sx={{ my: 2, mx: { lg: 10, md: 5, sm: 5, xs: 2 } }}>
            <form action="" onSubmit={e => {
                e.preventDefault();

                (async () => {
                    const token = await register(
                        name.current.value,
                        handle.current.value,
                        profile.current.value,
                        password.current.value
                    );
                    if (token) {
                        navigate('/login', { state: "Register Successful" });
                    } else {
                        setErr(true);
                        setErrMsg('Name, Handle, Profile and Password are required');
                    }
                })()
            }}>
                {err && <Alert severity='error' sx={{ mb: 4 }}>{errMsg}</Alert>}
                <OutlinedInput placeholder='Name' fullWidth sx={{ mb: 2 }} inputRef={name} />
                <OutlinedInput placeholder='Handle' fullWidth sx={{ mb: 2 }} inputRef={handle} />
                <OutlinedInput placeholder='Profile' fullWidth sx={{ mb: 2 }} inputRef={profile} />
                <OutlinedInput type="Password" placeholder='password' fullWidth sx={{ mb: 2 }} inputRef={password} />
                <Button variant="contained" type='submit'>Register</Button>
            </form>
        </Box >
    )
}

export default Register