import React, { useState } from 'react';
import { Card, CardContent, Button, Typography, TextField } from '@mui/material';
import { styled } from '@mui/system';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../Config';

export const StyledCard = styled(Card)({
    width: 300,
    margin: 'auto',
    marginTop: 50,
    padding: 20,
    transition: 'transform 0.5s ease',
  
    '&.signup': {
      transform: 'rotateY(180deg)',
    },
  });
function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        const user = {email,password}
        axios.post(`${baseUrl}/login`,user).then((res) => {
            if(res.data === true){
                alert('LoggedIn Successfully');
                navigate('/')
            }else if(res.data === 'User not Found'){
                alert('User not found')
            }else{
                alert("Invalid email or password")
            }
        }).catch((err)=>{
            alert('Login Failed');
        })
    }
    axios.defaults.withCredentials = true;
    return (
        
            <div className={`auth-container login`}>
                <StyledCard>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            { 'Login' }
                        </Typography>
                        <form>
                            <TextField label="Username" variant="outlined" fullWidth margin="normal" type='email' onChange={(e) => {setEmail(e.target.value)}}/>
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={(e)=>{setPassword(e.target.value)}}
                            />
                            
                            <Button variant="contained" color="primary" fullWidth type="submit" onClick={handleLogin}>
                                { 'Login' }
                            </Button>
                        </form>
                        <Button color="primary"  fullWidth onClick={()=>{navigate('/signup')}}>
                            { 'Switch to Sign Up'}
                        </Button>
                    </CardContent>
                </StyledCard>
            </div>
        
    )
}

export default Login