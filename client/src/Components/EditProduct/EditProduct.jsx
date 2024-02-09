import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {
    Container,
    Grid,
    Paper,
    TextField,
    Button,
    Typography,
} from '@mui/material';
import axios from 'axios';
import { baseUrl, imageUrl } from '../../Config';
import Loading from '../Loading/Loading';

function EditProduct() {
    const { id } = useParams();
    const [oldimage, setOldimage] = useState('');
    const [selectedImage, setSelectedimage] = useState(null);
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: '',
        category: '',
        price: '',
        quantity: '',
        description: '',
        image: ''
    });
    //fetch the detail of each product
    useEffect(() => {
        axios.get(`${baseUrl}/eachProduct/${id}`).then((res) => {
            const fetchedProduct = res.data;
            setProduct({
                name: fetchedProduct.name,
                category: fetchedProduct.category,
                price: fetchedProduct.price,
                quantity: fetchedProduct.quantity,
                description: fetchedProduct.description,
                image: fetchedProduct.image,
            });
            setOldimage(fetchedProduct.image);
        });
    },[])
    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name',product.name);
        formData.append('category',product.category);
        formData.append('price',product.price);
        formData.append('quantity',product.quantity);
        formData.append('description',product.description);
        formData.append('oldimage',oldimage);
        formData.append('image',product.image);
        axios.post(`${baseUrl}/updateProduct/${id}`,formData).then((res)=> {
            alert('Product Updated successfully');
            navigate('/Edit');
        }).catch(error=>alert('Error while updating'))
    }
    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        setSelectedimage(URL.createObjectURL(file));
        setProduct({...product,image:file})

    }
return (
    product.name !== '' ? 
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Paper elevation={3} style={{ padding: '20px' }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField label="Product Name" fullWidth variant="outlined" defaultValue={product.name}  onChange={(e) => { setProduct({...product,name:e.target.value})}}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Product Category" fullWidth variant="outlined" defaultValue={product.category} onChange={(e) => { setProduct({...product,category:e.target.value}) }}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Price" fullWidth variant="outlined" type='number' defaultValue={product.price} onChange={(e) => { setProduct({...product,price:e.target.value}) }}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Quantity" fullWidth variant="outlined" type='number' defaultValue={product.quantity}  onChange={(e) => { setProduct({...product,description:e.target.value}) }}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label=""
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        defaultValue={product.description}
                    />
                </Grid>
                <Grid item xs={12}>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="file-input"
                        type="file"
                        onChange={handleImageChange}
                    />
                    <label htmlFor="file-input">
                        <Button variant="outlined" component="span">
                            Upload Image
                        </Button>
                    </label>
                    <Typography variant="body2" color="textSecondary">
                        (Optional: Update an image for the product)
                    </Typography>
                    <img
                        src={selectedImage ||`${imageUrl}/${product.image}`}
                        alt="Product"
                        style={{ maxWidth: '30%', height: 'auto', marginTop: '20px' }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleUpdate}>
                        Update Product
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    </Container>
    :<Loading/>
)
}

export default EditProduct;