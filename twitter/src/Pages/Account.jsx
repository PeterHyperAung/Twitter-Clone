import React from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import { Edit as EditIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth'

const Account = () => {
    const { authUser } = useAuth();
    return (
        <>
            <Box bgcolor="gray" height={160}></Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: "space-between", padding: '0 15px', boxSizing: 'border-box' }}>
                <Box>
                    <Typography variant='h5'>{authUser.name}</Typography>
                    <Typography variant='h5'>{authUser.handle}</Typography>
                    <Typography variant='h5'>{authUser.profile}</Typography>
                </Box>
                <Box margin="15px">
                    <Link to="/account/edit">
                        <IconButton aria-label="edit">
                            <EditIcon />
                        </IconButton>
                    </Link>
                </Box>
            </Box>
        </>
    )
}

export default Account