import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('Laptop');
    const [company, setCompany] = useState('AMZ');
    const [topN, setTopN] = useState(10);
    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(10000);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get(`http://20.244.56.144/test/companies/${company}/categories/${category}/products`, {
                params: {
                    'top': topN,
                    'minPrice': minPrice,
                    'maxPrice': maxPrice,
                },
            });
            setProducts(response.data);
        };
        fetchProducts();
    }, [category, company, topN, minPrice, maxPrice]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Top Products</Typography>
            <Grid container spacing={3}>
                {products.map((product, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{product.productName}</Typography>
                                <Typography>Price: {product.price}</Typography>
                                <Typography>Rating: {product.rating}</Typography>
                                <Typography>Discount: {product.discount}%</Typography>
                                <Typography>Availability: {product.availability}</Typography>
                                <Link to={`/product/${index}`}>
                                    <Button variant="contained" color="primary">View Details</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductsList;
