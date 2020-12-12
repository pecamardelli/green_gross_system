import React        from 'react';

function CardDeck(props) {
    const CardComponent = props.cardComponent;
    return (
        <div className='container'>
            <div className={`row row-cols-1 row-cols-md-${props.cols}`}>
                { props.cards?.map(item => 
                    <div className={`col mb-${props.cols}`} key={item.id}>
                        <CardComponent data={item} />
                    </div>)
                }
            </div>
        </div>
    );
}

export default CardDeck;