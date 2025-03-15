import React from 'react';
import { Grid, Card, CardContent, CardActions, CardMedia, Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Pagination } from '@mui/material';

const Inventory = ({ paginatedCards, viewMode, expansions, addToCart, totalPages, currentPage, setCurrentPage }) => {
    return (
        <Card style={{ padding: '16px' }}>
            <Typography variant="h6">Inventaire</Typography>
            {viewMode === 'grid' ? (
                <Grid container spacing={2}>
                    {paginatedCards.map(card => (
                        <Grid item key={card.blueprint_id} xs={12} sm={6} md={4} lg={3}>
                            <Card className="card">
                                <Grid container>
                                    <Grid item xs={6}>
                                        <div className="ribbon-container">
                                            <CardMedia
                                                component="img"
                                                image={`${imageBaseUrl}${card.blueprint_id}.jpg`}
                                                alt={card.name_fr || card.name_en}
                                                height="200"
                                                className={`card-image ${card.properties_hash.pokemon_reverse ? 'reverse-glow' : ''}`}
                                            />
                                            {card.properties_hash.pokemon_reverse && (
                                                <div className="ribbon">Reverse</div>
                                            )}
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} className="card-details">
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant="h6" className="card-name">{card.name_fr || card.name_en}</Typography>
                                            <span className="card-collector-number">#{card.properties_hash.collector_number || 'N/A'}</span>
                                        </div>
                                        <Typography className="card-expansion">{expansions[card.expansion.id]}</Typography>
                                        <Typography className="card-rarity">{card.properties_hash.pokemon_rarity}</Typography>
                                        <Typography className="card-condition">{card.condition || 'Non spécifiée'}</Typography>
                                        <Typography className="card-price">{(card.price_cents / 100).toFixed(2)} €</Typography>
                                        <div className="card-quantity">{card.quantity || 0} disponible(s)</div>
                                    </Grid>
                                </Grid>
                                <CardActions>
                                    <Button variant="contained" color="warning" fullWidth onClick={(e) => addToCart(card, e)}>
                                        <span className="mdi mdi-cart" />
                                        Ajouter au panier
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {tableHeaders.map(header => (
                                    <TableCell key={header.value} align={header.align}>{header.text}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedCards.map(card => (
                                <TableRow key={card.blueprint_id}>
                                    <TableCell>{card.properties_hash.collector_number || 'N/A'}</TableCell>
                                    <TableCell>
                                        <CardMedia
                                            component="img"
                                            image={`${imageBaseUrl}${card.blueprint_id}.jpg`}
                                            alt={card.name_fr || card.name_en}
                                            height="50"
                                            className="card-image"
                                        />
                                    </TableCell>
                                    <TableCell>{card.name_fr || card.name_en}</TableCell>
                                    <TableCell>{expansions[card.expansion.id]}</TableCell>
                                    <TableCell>{card.quantity || 0}</TableCell>
                                    <TableCell>{card.properties_hash.pokemon_language}</TableCell>
                                    <TableCell>{card.condition || 'Non spécifiée'}</TableCell>
                                    <TableCell>{(card.price_cents / 100).toFixed(2)} €</TableCell>
                                    <TableCell>{card.properties_hash.pokemon_reverse ? 'Reverse' : 'Normale'}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={(e) => addToCart(card, e)}>
                                            <span className="mdi mdi-cart" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Pagination count={totalPages} page={currentPage} onChange={(e, page) => setCurrentPage(page)} style={{ marginTop: '16px' }} />
        </Card>
    );
};

export default Inventory;
