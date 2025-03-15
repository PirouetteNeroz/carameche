import React, { useState, useEffect, useMemo } from 'react';
import { Container, AppBar, Toolbar, Typography, Button, IconButton, Tabs, Tab, Grid, Card, CardContent, CardActions, CardMedia, Pagination, Snackbar, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Header from './components/Header';
import Filters from './components/Filters';
import Inventory from './components/Inventory';
import SnackbarComponent from './components/Snackbar';

const API_PRODUCTS = 'https://api.cardtrader.com/api/v2/products/export';
const API_EXPANSIONS = 'https://api.cardtrader.com/api/v2/expansions/export';
const API_TOKEN = 'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJjYXJkdHJhZGVyLXByb2R1Y3Rpb24iLCJzdWIiOiJhcHA6MTM5MzgiLCJhdWQiOiJhcHA6MTM5MzgiLCJleHAiOjQ4OTU2MzQ3MTcsImp0aSI6IjQxMjA3NmNjLTcyZTEtNDljOC1iODA2LTE3OTJiNmU3N2JhMyIsImlhdCI6MTczOTk2MTExNywibmFtZSI6Ik5lcm96YnJpY2tzIEFwcCAyMDI1MDIwODE3NDkxOSJ9.PkkEXit3MvxmVij_e5Eyz55k_3EYgQF-2ln9goSfMbQD3mIpDVrSkQa010BfnF9IR1L8fvswAyxk56qiUr2LKm2KXX0iKAvVRR373A3XEDwgNtGGBBAR-rxh8raL1hW8e4AH_bps1tVFTrdZ_W-Odg5egSxLFIxnLgi0a9It5KVeVkjdgLmxYuaCXspgml9TXfgJcJ2GH62izvB5eUsAj4NhobpH5q_Pyfbyw2cJu4HmilQjBSOm4NsmRW7Nd692tNT2semj1Oh1UqV1xel2WewtLaWlUAVHYt2LSMWrEw_kx9Yjk9Kz-rM67tk0nXosKklnIigJpcrmRUXf-O7qJA';
const imageBaseUrl = 'https://www.cardtrader.com/images/blueprint/';

const App = () => {
    const [inventory, setInventory] = useState([]);
    const [expansions, setExpansions] = useState({});
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [tab, setTab] = useState('inventory');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedExpansion, setSelectedExpansion] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedRarity, setSelectedRarity] = useState('');
    const [selectedReverse, setSelectedReverse] = useState('');
    const [selectedCondition, setSelectedCondition] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showCartAnimation, setShowCartAnimation] = useState(false);
    const [cartAnimationStyle, setCartAnimationStyle] = useState({});
    const [snackbar, setSnackbar] = useState({ show: false, message: '', color: 'success' });
    const [viewMode, setViewMode] = useState('grid');

    const itemsPerPage = 100;

    const totalItemsInCart = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);

    const normalizeString = (str) => {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    };

    const filteredCards = useMemo(() => {
        let cards = inventory.filter(card => {
            if (searchQuery) {
                const searchTerm = normalizeString(searchQuery);
                const nameEn = normalizeString(card.name_en);
                const nameFr = normalizeString(card.name_fr);
                if (!nameEn.includes(searchTerm) && !nameFr.includes(searchTerm)) return false;
            }
            if (selectedExpansion && card.expansion.id != selectedExpansion) return false;
            if (selectedLanguage && card.properties_hash.pokemon_language != selectedLanguage) return false;
            if (selectedRarity && card.properties_hash.pokemon_rarity != selectedRarity) return false;
            if (selectedReverse !== "" && card.properties_hash.pokemon_reverse.toString() !== selectedReverse) return false;
            if (selectedCondition && card.condition !== selectedCondition) return false;
            return true;
        });
        if (sortOrder === 'asc') {
            cards.sort((a, b) => a.properties_hash.collector_number - b.properties_hash.collector_number);
        } else if (sortOrder === 'desc') {
            cards.sort((a, b) => b.properties_hash.collector_number - a.properties_hash.collector_number);
        }
        return cards;
    }, [inventory, searchQuery, selectedExpansion, selectedLanguage, selectedRarity, selectedReverse, selectedCondition, sortOrder]);

    const totalPages = useMemo(() => Math.ceil(filteredCards.length / itemsPerPage), [filteredCards]);

    const paginatedCards = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredCards.slice(start, end);
    }, [filteredCards, currentPage]);

    const expansionOptions = useMemo(() => Object.entries(expansions).map(([id, code]) => ({ title: code, value: id })), [expansions]);

    const showNotification = (message, color = 'success') => {
        setSnackbar({ show: true, message, color });
        setTimeout(() => setSnackbar({ ...snackbar, show: false }), 3000);
    };

    const addToCart = (card, event) => {
        const existingItem = cart.find(item => item.blueprintId === card.blueprint_id);
        if (existingItem) {
            if (existingItem.quantity >= card.quantity) {
                showNotification("Quantité maximale atteinte pour cette carte.", 'error');
                return;
            }
            existingItem.quantity += 1;
        } else {
            cart.push({
                blueprintId: card.blueprint_id,
                name: card.name_fr || card.name_en,
                extension: expansions[card.expansion.id],
                price: (card.price_cents / 100),
                quantity: 1,
                maxQuantity: card.quantity,
                condition: card.condition || 'Non spécifiée',
                collectorNumber: card.properties_hash.collector_number || 'N/A'
            });
        }
        showNotification(`${card.name_fr || card.name_en} ajoutée au panier.`, 'success');
        triggerCartAnimation(event);
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const triggerCartAnimation = (event) => {
        const buttonRect = event.target.getBoundingClientRect();
        const buttonX = buttonRect.left + buttonRect.width / 2;
        const buttonY = buttonRect.top + buttonRect.height / 2;
        setCartAnimationStyle({ left: `${buttonX}px`, top: `${buttonY}px` });
        setShowCartAnimation(true);
        setTimeout(() => setShowCartAnimation(false), 800);
    };

    const resetFilters = () => {
        setSearchQuery('');
        setSelectedExpansion('');
        setSelectedLanguage('');
        setSelectedRarity('');
        setSelectedReverse('');
        setSelectedCondition('');
        setSortOrder('');
    };

    const fetchExpansions = async () => {
        try {
            const response = await fetch(API_EXPANSIONS, {
                method: "GET",
                headers: { "Authorization": `Bearer ${API_TOKEN}` }
            });
            if (!response.ok) throw new Error(`Erreur API Expansions: ${response.status}`);
            const data = await response.json();
            const expansionsMap = {};
            data.forEach(exp => expansionsMap[exp.id] = exp.name);
            setExpansions(expansionsMap);
        } catch (error) {
            console.error("Erreur lors du chargement des extensions :", error);
        }
    };

    const fetchInventory = async () => {
        try {
            const response = await fetch(API_PRODUCTS, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${API_TOKEN}` }
            });
            if (!response.ok) throw new Error(`Erreur API Produits: ${response.status}`);
            const data = await response.json();
            const inventoryWithFrenchNames = await Promise.all(data.map(async (card) => {
                const frenchName = await fetchFrenchPokemonName(card.name_en.toLowerCase());
                return { ...card, name_fr: frenchName, condition: card.properties_hash.condition || 'Non spécifiée' };
            }));
            setInventory(inventoryWithFrenchNames);
        } catch (error) {
            console.error("Erreur API :", error);
        }
    };

    const fetchFrenchPokemonName = async (name) => {
        // Implement your fetchFrenchPokemonName function here
        return name;
    };

    useEffect(() => {
        fetchExpansions();
        fetchInventory();
    }, []);

    return (
        <Container>
            <SnackbarComponent snackbar={snackbar} setSnackbar={setSnackbar} />
            <Header
                viewMode={viewMode}
                setViewMode={setViewMode}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                totalItemsInCart={totalItemsInCart}
            />
            <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
                <Tab value="inventory" label="Inventaire" />
                <Tab value="cart" label="Panier" />
            </Tabs>
            <Container>
                <Button onClick={() => setViewMode(viewMode === 'grid' ? 'table' : 'grid')} style={{ marginBottom: '16px' }}>
                    {viewMode === 'grid' ? 'Vue Tableau' : 'Vue Grille'}
                </Button>
                {tab === 'inventory' && (
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3} lg={2}>
                            <Filters
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                selectedExpansion={selectedExpansion}
                                setSelectedExpansion={setSelectedExpansion}
                                selectedLanguage={selectedLanguage}
                                setSelectedLanguage={setSelectedLanguage}
                                selectedRarity={selectedRarity}
                                setSelectedRarity={setSelectedRarity}
                                selectedReverse={selectedReverse}
                                setSelectedReverse={setSelectedReverse}
                                selectedCondition={selectedCondition}
                                setSelectedCondition={setSelectedCondition}
                                sortOrder={sortOrder}
                                setSortOrder={setSortOrder}
                                expansionOptions={expansionOptions}
                                resetFilters={resetFilters}
                            />
                        </Grid>
                        <Grid item xs={12} md={9} lg={10}>
                            <Inventory
                                paginatedCards={paginatedCards}
                                viewMode={viewMode}
                                expansions={expansions}
                                addToCart={addToCart}
                                totalPages={totalPages}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Container>
    );
};

export default App;
