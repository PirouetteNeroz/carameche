import React from 'react';
import { Card, CardContent, CardActions, CardMedia, Typography, Button } from '@mui/material';

const CardComponent = ({ card, expansions, addToCart }) => {
    return (
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
    );
};

export default CardComponent;
