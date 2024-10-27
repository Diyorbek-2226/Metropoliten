import React, { useState } from 'react';  
import './fanlar.css';  

export default function Fanlar() {  
    const cards = [  
        { title: "INTERACTIVE MANUAL FOR ELECTRIC", image: "https://picsum.photos/id/1/300/400" },  
        { title: "PORTAL AMPHIBIOUS GADGETS", image: "https://picsum.photos/id/2/200/300" },  
        { title: "ALTERNATE FUEL", image: "https://picsum.photos/id/3/300/400" },  
        { title: "ALTERNATE FUEL", image: "https://picsum.photos/id/4/300/400" },  
        { title: "ALTERNATE FUEL", image: "https://picsum.photos/id/5/300/400" },  
        { title: "ALTERNATE FUEL", image: "https://picsum.photos/id/6/300/400" },  
    ];  

    const [currentIndex, setCurrentIndex] = useState(0);  

    const nextCard = () => {  
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(cards.length / 4));  
    };  

    const prevCard = () => {  
        setCurrentIndex((prevIndex) => (prevIndex - 1 + Math.ceil(cards.length / 4)) % Math.ceil(cards.length / 4));  
    };  

    const displayedCards = cards.slice(currentIndex * 4, currentIndex * 4 + 4);  

    return (  
       <div className=" mx-auto container w-4/5 mt-12 mb-12">
        <h1 className='text-3xl'>Fanlar</h1>
         <div className="carousel mx-auto container w-4/5 mt-12 mb-12">  
            <button onClick={prevCard} className="prev">❮</button>  
            <div className="card-container">  
                {displayedCards.map((card, index) => (  
                    <div className="card" key={index}>  
                        <img src={card.image} alt={card.title} />  
                        <h3>{card.title}</h3>  
                        <button>View More</button>  
                    </div>  
                ))}  
            </div>  
            <button onClick={nextCard} className="next">❯</button>  
        </div>
       </div>
        
        
    );  
}