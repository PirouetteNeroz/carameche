import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, TextField } from '@mui/material';

const Header = ({ viewMode, setViewMode, searchQuery, setSearchQuery, totalItemsInCart }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    <Button href="/inventory.html" color="inherit">Carameche</Button>
                </Typography>
                <IconButton onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')}>
                    {viewMode === 'grid' ? <span className="mdi mdi-view-list" /> : <span className="mdi mdi-view-grid" />}
                </IconButton>
                <TextField
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    label="Rechercher..."
                    variant="outlined"
                    size="small"
                    style={{ marginRight: '16px' }}
                />
                <IconButton href="/inventory.html" color="inherit">
                    <span className="mdi mdi-home" />
                </IconButton>
                <IconButton href="/cart.html" color="inherit">
                    <span className="mdi mdi-cart" />
                    <span>{totalItemsInCart}</span>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;