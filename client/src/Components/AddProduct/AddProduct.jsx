import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Paper, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { baseUrl } from '../../Config';

function AddProduct() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const handleAddProduct = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('quantity',quantity)
        formData.append('description', description);
        formData.append('image', image);
       axios.post(`${baseUrl}/addProduct`,formData).then((res)=>{
        if(res.data){
            alert('Product Added Successfully');
            navigate('/')
        }else{
            alert('Product is not added')
        }
       }).catch(err=>alert('Error while adding Product'));
    }
    return (
        <div>
            <Container maxWidth="md" style={{ marginTop: '20px' }}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField label="Product Name" fullWidth variant="outlined" onChange={(e) => { setName(e.target.value) }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Product Category" fullWidth variant="outlined" onChange={(e) => { setCategory(e.target.value) }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Price" fullWidth variant="outlined" type='number' onChange={(e) => { setPrice(e.target.value) }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField label="Quantity" fullWidth variant="outlined" type='number' onChange={(e) => { setQuantity(e.target.value) }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                onChange={(e) => { setDescription(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="file-input"
                                type="file"
                                onChange={(e) => { setImage(e.target.files[0]) }}
                            />
                            <label htmlFor="file-input">
                                <Button variant="outlined" component="span">
                                    Upload Image
                                </Button>
                            </label>
                            <Typography variant="body2" color="textSecondary">
                                ( Upload an image for the product)
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" style={{ margin: '0 auto', display: 'block' }} onClick={handleAddProduct}>
                                Add Product
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </div>
    )
}

export default AddProduct;