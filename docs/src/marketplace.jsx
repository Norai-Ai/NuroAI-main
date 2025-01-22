import React, { useState, useEffect } from 'react';

const Marketplace = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // Fetch marketplace items from backend
        fetch('/api/marketplace')
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>AI Marketplace</h1>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        <h2>{item.name}</h2>
                        <p>Type: {item.type}</p>
                        <p>Price: ${item.price}</p>
                        <p>Description: {item.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Marketplace;
