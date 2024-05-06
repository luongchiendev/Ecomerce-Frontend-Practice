import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import FormProduct from '../component/FormProduct';
import FileUpload from '../component/ImportFile';
import ExportButton from '../component/ExportFile';


function ProductPage() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    // const [pagination, setPagination] = useState({ total: 0, current: 1 });

    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    // const navigate = useNavigate();
    // const handleEditClick = (product) => {
    //     setEditedProduct({ ...product });
    //     setIsEditing(true);
    // };
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async (page = 0, limit = 0, sort = '', search = '') => {
        try {
            const response = await fetch(`http://localhost:3056/v1/api/product/getall/?limit=${limit}&page=${page}&sort=${sort}&search=${search}`);
            const data = await response.json();
            console.log('Fetched products:', data);

            if (Array.isArray(data.data)) {
                setProducts(data.data);
            } else {
                console.error('Fetch products error: products is not an array');
            }

            // setPagination({ total: data.totalPages, current: data.currentPage });
        } catch (error) {
            console.error('Fetch products error:', error);
        }
    };

    const handleSearch = () => {
        fetchProducts(0, 0, '', searchTerm);
    };

    // const handlePaginationChange = (newPage) => {
    //     fetchProducts(newPage, 10, '', '');
    // };

    const handleRefresh = () => {
        fetchProducts();
    };


    const handleDeleteProduct = async (productId) => {
        try {
            await fetch(`http://localhost:3056/v1/api/products/delete/${productId}`, {
                method: 'DELETE'
            })
            fetchProducts()
        } catch (error) {
            console.log("Delete product error: ", error)
        }
    }


    const handleEditProduct = (product) => {
        const editedProductObject = {
            _id: product[0],
            name: product[1],
            thumb: product[2],
            description: product[3],
            price: product[4],
            quantity: product[5]
        };
        setEditedProduct(editedProductObject);
        setIsEditing(true);

    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct(prevState => {
            const updatedProduct = {
                ...prevState,
                [name]: value
            };
            // console.log(updatedProduct);  // Kiểm tra dữ liệu mới ở đây
            return updatedProduct;
        });
    };
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleProductChange = (e) => {
        setSelectedProduct(e.target.value);
    };

    const handleEditSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:3056/v1/api/products/update/${editedProduct._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedProduct),
            });
            console.log(editedProduct._id)

            if (response.status === 200) {
                fetchProducts();
                setIsEditing(false);
                setEditedProduct(null);
            } else {
                console.error('Edit product failed:', response.statusText);
            }
        } catch (error) {
            console.error('Edit product error:', error);
        }
    };


    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Product List
            </Typography>
            <TextField
                label="Search Product"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 2 }}
            />
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    id="category-select"
                    value={selectedCategory}
                    label="Category"
                    onChange={handleCategoryChange}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="kid">Kid</MenuItem>
                    <MenuItem value="women">Women</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="product-label">Product</InputLabel>
                <Select
                    labelId="product-label"
                    id="product-select"
                    value={selectedProduct}
                    label="Product"
                    onChange={handleProductChange}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="sneaker">Sneaker</MenuItem>
                    <MenuItem value="sandal">Sandal</MenuItem>
                </Select>
            </FormControl>
            <FileUpload></FileUpload>
            <ExportButton></ExportButton>
            <Button variant="contained" color="primary" onClick={handleSearch} sx={{ mr: 2 }}>
                Search
            </Button>

            <Button variant="contained" color="primary" onClick={handleRefresh} sx={{ mr: 2 }}>
                Refresh
            </Button>
            <FormProduct></FormProduct>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Thumbnail</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Category Type</TableCell>
                            <TableCell>Product Type</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product, index) => (
                            <TableRow key={index}>
                                <TableCell>{product[0]}</TableCell>
                                <TableCell>{product[1]}</TableCell>
                                <TableCell>{product[2]}</TableCell>
                                <TableCell>{product[3]}</TableCell>
                                <TableCell>{product[4]}</TableCell>
                                <TableCell>{product[5]}</TableCell>
                                <TableCell>{product[6]}</TableCell>
                                <TableCell>{product[7]}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="primary" onClick={() => handleEditProduct(product)}>Edit</Button>
                                    <Button variant="outlined" color="secondary" onClick={() => handleDeleteProduct(product[0])}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Pagination */}
            {/* <div>
                <Button disabled={pagination.current === 1} onClick={() => handlePaginationChange(pagination.current - 1)}>Previous</Button>
                <Button disabled={pagination.current === pagination.total} onClick={() => handlePaginationChange(pagination.current + 1)}>Next</Button>
            </div> */}


            {isEditing && (
                <div>
                    <Typography variant="h5" gutterBottom>
                        Edit Product
                    </Typography>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        name="name"
                        value={editedProduct.name}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Thumbnail"
                        variant="outlined"
                        fullWidth
                        name="thumb"
                        value={editedProduct.thumb}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        name="description"
                        value={editedProduct.description}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Price"
                        variant="outlined"
                        fullWidth
                        name="price"
                        value={editedProduct.price}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Quantity"
                        variant="outlined"
                        fullWidth
                        name="quantity"
                        value={editedProduct.quantity}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                    />
                    <Button variant="contained" color="primary" onClick={handleEditSubmit} sx={{ mr: 2 }}>
                        Save
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => setIsEditing(false)}>
                        Cancel
                    </Button>
                </div>
            )}

        </Container>
    );
}

export default ProductPage;
