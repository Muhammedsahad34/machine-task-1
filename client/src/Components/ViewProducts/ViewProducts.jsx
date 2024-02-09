import React, { useEffect, useState } from 'react'
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Paper,
  } from '@mui/material';
  import EditIcon from '@mui/icons-material/Edit';
  import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { baseUrl } from '../../Config';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';
function ViewProducts() {
    const [data,setData]= useState([]);
    const navigate = useNavigate();
      useEffect(()=>{
        axios.get(`${baseUrl}/All-products`).then((res) => {
            setData(res.data)
        })
      },[])
    //Delete the product
    const handleDelete = (proId) => {
        if(window.confirm('Do you want to delete ?')){

            axios.get(`${baseUrl}/deleteProduct/${proId}`).then((res) => {
                alert('Product successfully deleted');
                navigate('/')
                
            }).catch(err=>{
                alert('Error occured');
            })
        }
    }
  return (
    data.length > 0 ?
    <TableContainer component={Paper} style={{margin:'15px 0'}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Id</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Product Category</TableCell>
            <TableCell>Product Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row._id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>
                <IconButton color="primary" size="small" onClick={()=>{navigate(`/edit-Product/${row._id}`)}}>
                  <EditIcon />
                </IconButton>
                <IconButton color="secondary" size="small" onClick={()=>{handleDelete(row._id)}}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    :<Loading/>
  )
}

export default ViewProducts