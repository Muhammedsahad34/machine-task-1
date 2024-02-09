import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
    IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';
import { baseUrl, imageUrl } from '../../Config';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [total,setTotal] = useState(0);
    //Fetch the Items in the cart when rendering component
    useEffect(()=>{
        axios.get(`${baseUrl}/fetchCart`,{withCredentials:true}).then((res)=>{
            setCartItems(res.data.data);
            setTotal(res.data.total)
        })
    },[]);
    //increment and decrement of the count
    const handleIncDec = (proId,count) => {
        axios.get(`${baseUrl}/incdecCount/${proId}/${count}`).then((res) => {
            const updatedCart = cartItems.map(product => {
                if (product._id === proId) {
                    if (count === 1) {
                        setTotal(total + product.price)
                    } else {
                        setTotal(total - product.price)
                    }

                    return { ...product, count: res.data.count };
                }
                return product;
            });
            setCartItems(updatedCart);
        }).catch((err) => console.log(err));
        }
    const handleRemoveItem = (proId,count,price) => {
        if(window.confirm('Do you want to remove this item')){
            axios.get(`${baseUrl}/removeFromCart/${proId}`,{withCredentials:true}).then((res) => {
                alert('product removed');
                if(res.data.products.length === 0){
                    setCartItems([])
                }else{
                    setCartItems(cartItems.filter(item => item._id !== proId));
                    setTotal(total - count * price);
                }
            })
        }
    }
    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', color: 'darkgrey' }}>
                Let's Buy Cart
            </Typography>
            {cartItems.length === 0 || cartItems.length === undefined ? (
                <Typography variant="h5" style={{margin:'0 auto',color:'darkgrey'}}>Your cart is empty.</Typography>
            ) : (
                <Grid container spacing={2}>
                    {cartItems.map((item, index) => (
                        <Grid item key={index} xs={10} sm={6} md={4} lg={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={`${imageUrl}/${item.image}`} // Replace with the actual image URL
                                    alt={item.name}
                                    style={{ objectFit: 'cover' }}
                                />
                                <CardContent>
                                    <Typography variant="h6">{item.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {item.category}
                                    </Typography>
                                    <Typography variant="body1" color="primary">
                                        {`Rs: ${item.price}`}
                                    </Typography>
                                    <Typography variant="body2">{`Count:`}
                                    {item.count > 1 ?
                                        <IconButton size="small" onClick={()=>{handleIncDec(item._id,-1)}}>
                                            <RemoveIcon/>
                                        </IconButton>
                                    :null}
                                        {item.count}
                                        <IconButton size="small" onClick={()=>{handleIncDec(item._id,1)}}>
                                            <AddIcon />
                                        </IconButton>
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleRemoveItem(item._id,item.count,item.price)}
                                        style={{ marginTop: '8px' }}
                                    >
                                        Remove
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                )}
            <Typography variant='h5' style={{textAlign:'right'}}>
                Total : {total}
            </Typography>
        </Container>
    )
}

export default Cart