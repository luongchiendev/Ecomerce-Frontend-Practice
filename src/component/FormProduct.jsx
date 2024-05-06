import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';

export default function FormProduct() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        thumb: '',
        description: '',
        category_type: '',
        product_type: '',
        price: 0,
        quantity: 0
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddProduct = async () => {
        console.log('Adding product...', formData);  // Log dữ liệu bạn gửi đi
        try {
            const response = await axios.post('http://localhost:3056/v1/api/products/create', formData);
            if (response.data.code === 201) {
                console.log('Product added successfully:', response.data.data);
                handleClose();
                // Reset form data if needed
                setFormData({
                    name: '',
                    thumb: '',
                    description: '',
                    category_type: '',
                    product_type: '',
                    price: 0,
                    quantity: 0
                });
            } else {
                console.error('Failed to add product:', response.data.message);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add Product
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="thumb"
                        label="Thumbnail"
                        type="text"
                        fullWidth
                        value={formData.thumb}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Price"
                        type="number"
                        fullWidth
                        value={formData.price}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="quantity"
                        label="Quantity"
                        type="number"
                        fullWidth
                        value={formData.quantity}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddProduct} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
