import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, TextField, Select, MenuItem, Button } from '@mui/material';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ category: '', company: '', minPrice: 0, maxPrice: 10000 });
  const [categories] = useState(["Phone", "Computer", "TV", "Earphone", "Tablet", "Charger", "Mouse", "Keypad", "Bluetooth", "Pendrive", "Remote", "Speaker", "Headset", "Laptop", "PC"]);
  const [companies] = useState(["AMZ", "FLP", "SNP", "MYN", "AZO"]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(`http://20.244.56.144/test/companies/${filters.company}/categories/${filters.category}/products?top=10&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}`);
      setProducts(response.data);
    };
    if (filters.category && filters.company) fetchProducts();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>Top Products</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Select fullWidth value={filters.company} name="company" onChange={handleFilterChange}>
            <MenuItem value=""><em>Select Company</em></MenuItem>
            {companies.map(company => (
              <MenuItem key={company} value={company}>{company}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={6}>
          <Select fullWidth value={filters.category} name="category" onChange={handleFilterChange}>
            <MenuItem value=""><em>Select Category</em></MenuItem>
            {categories.map(category => (
              <MenuItem key={category} value={category}>{category}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Min Price" type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Max Price" type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} />
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={() => setFilters({ ...filters })} style={{ marginTop: '20px' }}>Apply Filters</Button>
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {products.map((product, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.productName}</Typography>
                <Typography>Price: ${product.price}</Typography>
                <Typography>Rating: {product.rating}</Typography>
                <Typography>Discount: {product.discount}%</Typography>
                <Typography>Availability: {product.availability}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
