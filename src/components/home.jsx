import React, { useEffect, useState } from 'react'
import httpService from '../services/httpService';
import CardDeck from './common/cardDeck';
import ProductCard from './common/productCard';

export default function Home() {
    const [ content, setContent] = useState([]);

    useEffect(() => {
        setContent(httpService.getAll());
    }, [setContent]);

    return (<>
            <CardDeck
                cards={ content }
                cardComponent={ ProductCard } 
                cols={5}
            />
            <div id="myMap"></div>
        </>
    )
}
