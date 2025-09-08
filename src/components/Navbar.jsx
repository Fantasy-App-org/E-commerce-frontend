import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Badge,
  IconButton,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('access');
  const [sellerStatus, setSellerStatus] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated) {
        try {
          const response = await api.get('/profile/');
          setSellerStatus(response.data.seller_status);
        } catch (error) {
          console.error('Failed to fetch profile:', error);
          setSellerStatus(null);
        }
      } else {
        setSellerStatus(null);
      }
    };

    const fetchCartCount = async () => {
      if (isAuthenticated) {
        try {
          const response = await api.get('/cart/');
          if (response.data && response.data.items) {
            setCartCount(response.data.items.length);
          }
        } catch (error) {
          console.error('Failed to fetch cart count:', error);
        }
      } else {
        setCartCount(0);
      }
    };

    fetchProfile();
    fetchCartCount();
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const isApprovedSeller = sellerStatus === 'approved';

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/home"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
          Inway Shopy
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button color="inherit" component={Link} to="/home">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/shop">
            Shop
          </Button>

          {/* Cart with Badge */}
          <IconButton
            component={Link}
            to="/cart"
            color="inherit"
            sx={{ position: 'relative' }}
          >
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <Button color="inherit" component={Link} to="/about">
            About
          </Button>

          {/* Voucher Options */}
          <Button color="inherit" component={Link} to="/vouchers/purchase">
            Buy Voucher
          </Button>
          <Button color="inherit" component={Link} to="/vouchers">
            My Vouchers
          </Button>


          {/* Apply Voucher will be on Cart page */}

          {isApprovedSeller && (
            <Button color="inherit" component={Link} to="/seller/dashboard">
              Seller
            </Button>
          )}

          {!isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>
              <Button color="inherit" component={Link} to="/orders">
                Orders
              </Button>
              <Button color="inherit" component={Link} to="/notifications">
                Notifications
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
