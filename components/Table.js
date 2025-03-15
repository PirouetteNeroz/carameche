import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton } from '@mui/material';

const TableComponent = ({ paginatedCards, expansions, addToCart }) => {
    const tableHeaders = [
        { text: 'Numéro de Collection', value: 'properties_hash.collector_number', align: 'start' },
        { text: 'Image', value: 'image', sortable: false, align: 'center' },
        { text: 'Nom du Pokémon', value: 'name', align: 'center' },
        { text: 'Extension', value: 'expansion', align: 'center' },
        { text: 'Quantité', value: 'quantity', align: 'center' },
        { text: 'Langue', value: 'properties_hash.pokemon_language', align: 'center' },
        { text: 'Condition', value: 'condition', align: 'center' },
        { text: 'Prix', value: 'price_cents', align: 'center' },
        { text: 'Version', value: 'properties_hash.pokemon_reverse', align: 'center' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
    ];

    return (
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
    );
};

export default TableComponent;
