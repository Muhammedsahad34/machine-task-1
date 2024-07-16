import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import { baseUrl } from '../../Config';


function Header() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const {userDetails,setUserDetails} = useContext(UserContext);
    const navigate = useNavigate();
    //Checking if user is Logged in or not by fetching profile detail
    useEffect(()=>{
        axios.get(`${baseUrl}/profile`,{withCredentials:true}).then((res)=>{
            setUserDetails(res.data);
        })
    },[])
    const handleDrawerOpen = () => {
        setDrawerOpen(true)
    }
    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };
    const handleLogOut = (e) => {
        e.preventDefault();
        if(window.confirm('Do you want to Logout ?')){
            axios.get(`${baseUrl}/logout`,{withCredentials:true}).then((res) => {
                if(res.data === false){
                    alert('Logout failed');
                }else{
                    setUserDetails(null);
                    navigate('/login')
                }
            }).catch(err=>alert('Error while trying to logout'));
        }
    }
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={()=>{navigate('/')}} style={{cursor:'pointer'}}>
                        Let's Buy
                    </Typography>

                    {/* Sidebar Drawer */}
                    <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
                        <List>
                            <ListItem button component={Link} to="/add-product" onClick={handleDrawerClose}>
                                <Typography variant="body1">Add Product</Typography>
                            </ListItem>
                            <ListItem button component={Link} to={userDetails?.valid? '/cart' : 'login'} onClick={handleDrawerClose}>
                                <Typography variant="body1">Cart</Typography>
                            </ListItem>
                            <ListItem button component={Link} to="/Edit" onClick={handleDrawerClose}>
                                <Typography variant="body1">Edit Product</Typography>
                            </ListItem>
                            {userDetails === null ?

                            <ListItem button component={Link} to="/login" onClick={handleDrawerClose}>
                                <Typography variant="body1">{"Login"}</Typography>
                            </ListItem>
                            :
                            <ListItem button component={Link} to="#" onClick={handleLogOut}>
                                <Typography variant="body1">{"Logout"}</Typography>
                            </ListItem>
                            }
                        </List>
                    </Drawer>
            <Toolbar sx={{ justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar alt="User Avatar" src="/path/to/user-avatar.jpg" />

                    <Typography variant="body1" sx={{ marginLeft: '10px' }}>
                        {userDetails !== null?userDetails?.user?.email:'email'}
                    </Typography>
                </div>
            </Toolbar>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header