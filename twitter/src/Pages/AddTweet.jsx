import { Box, Button, Container, TextField } from '@mui/material'
import React from 'react'

const AddTweet = () => {
  return (
    <Container sx={{ }}>
        <Box mt="50px">
            <form action="">
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1}}>
              <TextField
                id="outlined-multiline-static"
                label="Enter Your Tweet"
                multiline
                rows={4}
                sx={{ width: '100%'}}
              />
              <Button type="submit" variant='contained'>Tweet</Button>
            </Box>
            </form>
        </Box>
    </Container>
  )
}

export default AddTweet