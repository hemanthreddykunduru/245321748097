import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent } from '@mui/material';

const ProductDetail = ({ location }) => {
    const { id } = useParams();
    const product = location.state.product;

    return (
        <Container>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>{product.productName}</Typography>
                    <Typography>Company: {product.company}</Typography>
                    <Typography>Category: {product.category}</Typography>
                    <Typography>Price: {product.price}</Typography>
                    <Typography>Rating: {product.rating}</Typography>
                    <Typography>Discount: {product.discount}%</Typography>
                    <Typography>Availability: {product.availability}</Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ProductDetail;
