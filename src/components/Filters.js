import React from 'react';
import { Card, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const Filters = ({
    searchQuery,
    setSearchQuery,
    selectedExpansion,
    setSelectedExpansion,
    selectedLanguage,
    setSelectedLanguage,
    selectedRarity,
    setSelectedRarity,
    selectedReverse,
    setSelectedReverse,
    selectedCondition,
    setSelectedCondition,
    sortOrder,
    setSortOrder,
    expansionOptions,
    resetFilters
}) => {
    const languageOptions = [
        { title: 'Français', value: 'fr' },
        { title: 'Anglais', value: 'en' },
        { title: 'Japonais', value: 'jp' }
    ];

    const rarityOptions = [
        { title: 'Commun', value: 'Common' },
        { title: 'Peu Commun', value: 'Uncommon' },
        { title: 'Rare', value: 'Rare' },
        { title: 'Holo', value: 'Holo Rare' },
        { title: 'Promo', value: 'Promo' },
        { title: 'Ultra Rare', value: 'Ultra Rare' },
        { title: 'Secret Rare', value: 'Secret Rare' },
        { title: 'Rare Holo EX', value: 'Rare Holo EX' },
        { title: 'Double Rare', value: 'Double Rare' },
        { title: 'Triple Rare', value: 'Triple Rare' },
        { title: 'Illustration Rare', value: 'Illustration Rare' }
    ];

    const reverseOptions = [
        { title: 'Cartes Reverse', value: 'true' },
        { title: 'Cartes Normales', value: 'false' }
    ];

    const conditionOptions = [
        { title: 'Mint', value: 'Mint' },
        { title: 'Near Mint', value: 'Near Mint' },
        { title: 'Slightly Played', value: 'Slightly Played' },
        { title: 'Moderately Played', value: 'Moderately Played' },
        { title: 'Played', value: 'Played' },
        { title: 'Heavily Played', value: 'Heavily Played' },
        { title: 'Poor', value: 'Poor' }
    ];

    const sortOptions = [
        { title: 'Tri Ascendant', value: 'asc' },
        { title: 'Tri Descendant', value: 'desc' }
    ];

    return (
        <Card style={{ padding: '16px' }}>
            <Typography variant="h6" style={{ color: '#FFC107' }}>Filtres</Typography>
            <TextField
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                label="Rechercher..."
                variant="outlined"
                size="small"
                fullWidth
                style={{ marginBottom: '16px' }}
            />
            <FormControl variant="outlined" fullWidth style={{ marginBottom: '16px' }}>
                <InputLabel>Extension</InputLabel>
                <Select
                    value={selectedExpansion}
                    onChange={(e) => setSelectedExpansion(e.target.value)}
                    label="Extension"
                >
                    {expansionOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>{option.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth style={{ marginBottom: '16px' }}>
                <InputLabel>Langue</InputLabel>
                <Select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    label="Langue"
                >
                    {languageOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>{option.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth style={{ marginBottom: '16px' }}>
                <InputLabel>Rareté</InputLabel>
                <Select
                    value={selectedRarity}
                    onChange={(e) => setSelectedRarity(e.target.value)}
                    label="Rareté"
                >
                    {rarityOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>{option.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth style={{ marginBottom: '16px' }}>
                <InputLabel>Type de carte</InputLabel>
                <Select
                    value={selectedReverse}
                    onChange={(e) => setSelectedReverse(e.target.value)}
                    label="Type de carte"
                >
                    {reverseOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>{option.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth style={{ marginBottom: '16px' }}>
                <InputLabel>Condition</InputLabel>
                <Select
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                    label="Condition"
                >
                    {conditionOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>{option.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="outlined" fullWidth style={{ marginBottom: '16px' }}>
                <InputLabel>Trier par</InputLabel>
                <Select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    label="Trier par"
                >
                    {sortOptions.map(option => (
                        <MenuItem key={option.value} value={option.value}>{option.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="contained" color="warning" fullWidth style={{ marginBottom: '16px' }} onClick={resetFilters}>
                Réinitialiser les filtres
            </Button>
        </Card>
    );
};

export default Filters;
