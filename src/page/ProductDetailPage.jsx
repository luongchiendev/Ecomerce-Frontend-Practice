import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";

const ProductDetailPage = () => {
    const { id } = useParams();
    // Fetch product details based on the ID from the URL params

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Product Detail
            </Typography>
            <Typography variant="h6" gutterBottom>
                Product ID: {id}
            </Typography>
            {/* Display product details here */}
        </Container>
    );
};

export default ProductDetailPage;
