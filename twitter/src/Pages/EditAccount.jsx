import { Box, OutlinedInput, Button, Alert } from '@mui/material'
import React, {useRef, useState} from 'react'
import { updateUser } from '../apiCalls/apiCalls';
import useAuth from '../hooks/useAuth';

const EditAccount = () => {
    const name = useRef();
    const profile = useRef();
    const password = useRef();
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [err, setErr] = useState(false);
    const {authUser, setAuthUser} = useAuth();
    return (
        <Box sx={{ my: 2, mx: { lg: 10, md: 5, sm: 5, xs: 2 } }}>
            <form action="" onSubmit={(e) => {
                e.preventDefault();
                (async () => {
                    const user = await updateUser(name.current.value, profile.current.value, password.current.value, authUser._id);

                    if(user) {
                        setAuthUser(user);
                        setSuccess(true);
                        name.current.value = '';
                        profile.current.value = '';
                        password.current.value = '';
                    } else {
                        setErr(true);
                        setErrMsg(
                            "Profile update failed, please try again",
                        )
                    }
                })();
            }}>
                {success && <Alert severity='success' sx={{ mb: 4 }}>User info updated</Alert>}
                {err && <Alert severity='error' sx={{ mb: 4 }}>{errMsg}</Alert>}
                <OutlinedInput placeholder='Name' fullWidth sx={{ mb: 2 }} inputRef={name} />
                <OutlinedInput placeholder='Profile' fullWidth sx={{ mb: 2 }} inputRef={profile} />
                <OutlinedInput type="Password" placeholder='password' fullWidth sx={{ mb: 2 }} inputRef={password} />
                <Button variant="contained" type='submit'>Update</Button>
            </form>
        </Box >
    )
}

export default EditAccount