import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';
import { Box, Card, CardContent, Avatar, Typography, CardActionArea, IconButton } from '@mui/material';
import { getTweets } from '../apiCalls/apiCalls';
import {  Add as AddIcon, FavoriteBorder as FavoriteIcon, MessageOutlined as MessageOutlinedIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom'
const Home = () => {
    const { auth } = useAuth();
    const [tweets, setTweets] = useState()
    console.log(tweets)

    useEffect(() => {
        (async function () {
            const data = await getTweets();
            setTweets(data);
        })()
    }, [])

    if (!auth) {
        return <div>Guest User</div>
    }

    return <Box sx={{ my: 3, mx: { lg: 28, md: 5, sm: 5, xs: 3 } }}>
        {tweets.map(tweet => {
            return (
                <Card sx={{ mb: 2 }} key={tweet._id}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt="Profile" sx={{ width: 64, height: 64 }} />
                        <Box sx={{ ml: 2, mt: 1, flex: '1' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>{tweet.owner_user[0].handle}</Typography>
                                <Typography>{new Date(tweet.created).toLocaleString()}</Typography>
                            </Box>
                            <CardActionArea>
                                <Box sx={{ my: 1}}>
                                    {tweet.body}
                                </Box>
                            </CardActionArea>
                            <Box mt="10px" sx={{display: 'flex', gap: 2}}>
                                <Box>
                                    <FavoriteIcon sx={{ color: 'dodgerblue', verticalAlign: 'middle' }} /> {tweet.likes.length}
                                </Box>
                                <Box>
                                    <MessageOutlinedIcon sx={{ color: 'dodgerblue', verticalAlign: 'middle' }} /> 0
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            )
        })}
        <Box position='fixed' bottom="20px" right="20px">
            <Link to="/tweets/add">
                <IconButton aria-label="add tweet" size="large" sx={{backgroundColor: 'dodgerBlue'}} >
                    <AddIcon sx={{color:"white"}} />
                </IconButton>
            </Link>
        </Box>
    </Box>

}

export default Home