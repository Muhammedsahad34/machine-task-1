import React from 'react';
import { CircularProgress, Typography, Container, Box } from '@mui/material';
function Loading() {
    return (
        <Container>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                <CircularProgress size={60} />
                <Typography variant="h6" color="textSecondary" style={{ marginTop: '16px' }}>
                    Loading...
                </Typography>
            </Box>
        </Container>
    )
}

export default Loading