import React, { useState } from 'react'
import {  CardContent, Button, Typography, TextField } from '@mui/material';
import  './SignUp.css';
import { StyledCard } from '../Login/Login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../Config';
function SignUp() {
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [conPass,setConPass] = useState('');
    const [mobileno,setMobileno] = useState('');
    const [samePass, setSamePass] = useState(true); 

    //function to submit the signup form into the backend
    const handleSubmit = (e)=>{
        e.preventDefault();
        const user = {email,password,mobileno}
        if(samePass){
           axios.post(`${baseUrl}/signup`,user).then((res) => {
            if(res.data){

                alert("Account created Successfully");
                navigate('/')
            }else{
                alert('User Already Exists');
            }
           }).catch((err) => {
            alert("Error while trying to signup");
           })
            
        }
        
    }
    //To check both password and confirm password are same
    const handlePass = (e) => {
        e.preventDefault();
        if(password !== conPass){
            setSamePass(false);
        }else{
            setSamePass(true)
        }
    }
    axios.defaults.withCredentials = true;
  return (
    <div className={`auth-container login`}>
                <StyledCard>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            { 'SignUp' }
                        </Typography>
                        <form>
                            <TextField label="Username" type="email" variant="outlined" fullWidth margin="normal" onChange={(e)=>{setEmail(e.target.value)}}/>
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={(e)=>{setPassword(e.target.value)}}
                            />
                            <TextField
                                label="Confirm Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={(e)=>{setConPass(e.target.value)}}
                                onBlur={handlePass}
                            />
                            <TextField
                                label="Mobile number"
                                type="number"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={(e)=>{setMobileno(e.target.value)}}
                                
                            />
                            {
                                !samePass && (
                                    <Typography variant='h6' gutterBottom>
                                        Password Mismatch
                                    </Typography>
                                )
                            }
                            <Button variant="contained" color="primary" fullWidth type="submit" onClick={handleSubmit}>
                                { 'SignUp' }
                            </Button>
                        </form>
                        <Button color="primary"  fullWidth onClick={()=>{navigate('/login')}}>
                            { 'Switch to Login'}
                        </Button>
                    </CardContent>
                </StyledCard>
            </div>
  )
}

export default SignUp