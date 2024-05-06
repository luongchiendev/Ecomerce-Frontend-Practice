import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Grid, Card, CardContent, CardMedia } from "@mui/material";

const products = [
    { id: 1, name: "Product 1", price: 10, imageUrl: "https://via.placeholder.com/150" },
    { id: 2, name: "Product 2", price: 15, imageUrl: "https://via.placeholder.com/150" },
    { id: 3, name: "Product 3", price: 20, imageUrl: "https://via.placeholder.com/150" },
];

const CartPage = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Your Cart
            </Typography>
            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid key={product.id} item xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.imageUrl}
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: ${product.price}
                                </Typography>
                                <Button component={Link} to={`/product/${product.id}`} variant="contained" color="primary">
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" color="primary" style={{ marginTop: "20px" }}>
                Checkout
            </Button>
        </Container>
    );
};

export default CartPage;
