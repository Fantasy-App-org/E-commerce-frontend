import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('access');

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.warn('You must be logged in to add products to the cart.');
      navigate('/login');
      return;
    }
    try {
      await api.post('/cart/add/', { product_id: product.id, qty: 1 });
      toast.success('Product added to cart!');
    } catch (err) {
      toast.error('Failed to add product to cart.');
      console.error(err);
    }
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.slug}`);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={product.thumbnail || 'https://via.placeholder.com/150'}
        alt={product.title}
        sx={{ objectFit: 'contain' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {product.category ? product.category.name : 'N/A'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', my: 1 }}>
          <Typography variant="h6" color="primary">
            ₹{product.price}
          </Typography>
          {product.mrp && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ ml: 2, textDecoration: 'line-through' }}
            >
              ₹{product.mrp}
            </Typography>
          )}
        </Box>
        <Typography variant="body2" color="text.secondary">
          In Stock: {product.stock}
        </Typography>
      </CardContent>
      <CardActions sx={{ mt: 'auto', justifyContent: 'space-between' }}>
        {product.stock > 0 ? (
          <Button size="small" variant="contained" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        ) : (
          <Button size="small" variant="text" disabled>
            Out of Stock
          </Button>
        )}
        <Button size="small" onClick={handleViewDetails}>
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;