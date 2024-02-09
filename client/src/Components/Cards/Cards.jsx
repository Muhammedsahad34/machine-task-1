import React, { useContext, useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Grid,
    Container

} from '@mui/material';
import axios from 'axios';
import { baseUrl } from '../../Config';
import Loading from '../Loading/Loading';
import { UserContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';




function Cards() {
    const [product, setProduct] = useState([]);
    const {userDetails} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get(`${baseUrl}/All-products`).then((res)=>{
            setProduct(res.data);
        })
    },[])
    //Add to cart 
    const handleAddtoCart = (proId) =>{
        if(userDetails === null){
            navigate('/login')
        }else{
            axios.get(`${baseUrl}/addToCart/${proId}`,{withCredentials:true}).then((res)=>{
                alert('product added successfully')
            }).catch((err)=>alert('Error while adding'));
        }
    }
    return (
        product.length > 0?
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            <Grid container spacing={3}>
                {product.map((pro)=>{
                    return(

                        <Grid item xs={10} sm={6} md={4} lg={4}>
                    <Card style={{ marginBottom: '16px' }}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={`${baseUrl}/images/product-images/${pro.image}`} // Placeholder image URL
                            alt="Product Image"
                            
                            />
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {pro.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {pro.category}
                            </Typography>
                            <Typography variant="body1" color="primary">
                                Rs: {pro.price}
                            </Typography>
                            <Typography variant="body2">Quantity: {pro.quantity}</Typography>
                            <Button variant="contained" color="primary" style={{ marginTop: '8px' }} onClick={()=>handleAddtoCart(pro._id)}>
                                Add to Cart
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                            )
                        })}
            </Grid>
        </Container>
        : <Loading/>
    )
}

export default Cards