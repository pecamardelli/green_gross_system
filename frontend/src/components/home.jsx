import React, { useEffect, useState } from 'react'
import { getProducts } from '../services/httpService';
import BingMaps from './bingMaps';
import CardDeck from './common/cardDeck';
import ProductCard from './common/productCard';

export default function Home() {
    const [ content, setContent] = useState([]);

    useEffect(() => {
        //setContent(httpService.getProducts());
        getProducts()
            .then(response => response.json())
            .then(data => setContent(data));
    }, [setContent]);

    return (<>
            <CardDeck
                cards={ content }
                cardComponent={ ProductCard } 
                cols={5}
            />
            <BingMaps />
        </>
    )
}
