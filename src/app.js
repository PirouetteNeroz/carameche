import React, { useState, useEffect } from 'react';

const App = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    // Simuler un appel API pour récupérer l'inventaire
    fetch('https://api.example.com/inventory')
      .then((response) => response.json())
      .then((data) => setInventory(data))
      .catch((error) => console.error('Erreur lors de la récupération des données:', error));
  }, []);

  return (
    <div>
      <h1>Inventaire Carameche</h1>
      <ul>
        {inventory.map((item) => (
          <li key={item.id}>
            {item.name} - {item.quantity} disponible(s)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
