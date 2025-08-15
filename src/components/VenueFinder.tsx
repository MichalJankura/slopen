import React, { useState, useEffect } from 'react';
import { venues } from '../data/venues';
import { Venue, RestaurantType } from '../types';

const sliderStyles = `
.slider-container {
    width: 80%;
    margin: 120px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    text-align: center;
    color: #333;
}

.answer-button {
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px 15px;
    margin: 5px;
    cursor: pointer;
    font-size: 16px;
    color: #333;
}

.answer-button.selected {
    background-color: #337ab7;
    color: #000;
    border-color: #337ab7;
}
`;

const VenueFinder: React.FC = () => {
    const [step, setStep] = useState(1);
    const [selectedType, setSelectedType] = useState('');
    const [selectedSubType, setSelectedSubType] = useState('');
    const [selectedDrink, setSelectedDrink] = useState('');
    const [selectedBeerType, setSelectedBeerType] = useState('');
    const [selectedSpiritType, setSelectedSpiritType] = useState('');
    const [selectedFoodOption, setSelectedFoodOption] = useState('');
    const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);

    const customVenueTypes = ['reštaurácia', 'fastfood', 'pub', 'klub', 'kaviareň'];
    const subTypes: RestaurantType[] = ['tradičná', 'ázijská', 'normal'];
    const drinkOptions = ['pivo', 'víno', 'tvrdý alkohol'];
    const beerTypeOptions = ['kraftové', 'bežné'];
    const spiritTypeOptions = ['biely', 'farebný', 'exkluzívny'];
    const foodOptions = ['len nápoje', 'plnohodnotné jedlo', 'snack k drinku'];

    const handleTypeSelect = (typeLabel: string) => {
        let typeValue = '';
        switch (typeLabel) {
            case 'reštaurácia':
            case 'fastfood':
                typeValue = 'restaurant';
                break;
            case 'pub':
                typeValue = 'pub';
                break;
            case 'klub':
                typeValue = 'club';
                break;
            case 'kaviareň':
                typeValue = 'cafe';
                break;
            default:
                typeValue = '';
                break;
        }
        setSelectedType(typeValue);
        setSelectedSubType('');
        setSelectedDrink('');
        setSelectedBeerType('');
        setSelectedSpiritType('');
        setSelectedFoodOption('');
    
        if (typeValue === 'restaurant' || typeValue === 'pub') {
            setStep(2);
        } else {
            setStep(5);
        }
    };

    const handleSubTypeSelect = (subType: string) => {
        setSelectedSubType(subType);
        setStep(5);
    };

    const handleDrinkSelect = (drink: string) => {
        setSelectedDrink(drink);
        if (drink === 'pivo') {
            setStep(3);
        } else if (drink === 'tvrdý alkohol') {
            setStep(3);
        } else {
            setStep(4);
        }
    };
    
    const handleBeerTypeSelect = (beerType: string) => {
        setSelectedBeerType(beerType);
        setStep(4);
    };

    const handleSpiritTypeSelect = (spiritType: string) => {
        setSelectedSpiritType(spiritType);
        setStep(4);
    };

    const handleFoodOptionSelect = (foodOption: string) => {
        setSelectedFoodOption(foodOption);
        setStep(5);
    };

    const filterVenues = () => {
        let results = venues;

        if (selectedType) {
            results = results.filter(venue => venue.type === selectedType);
        }

        if (selectedType === 'restaurant' && selectedSubType) {
            results = results.filter(venue => venue.restaurantType === selectedSubType);
        }
        
        setFilteredVenues(results);
    };

    useEffect(() => {
        if (step === 5) {
            filterVenues();
        }
    }, [selectedType, selectedSubType, selectedDrink, selectedBeerType, selectedSpiritType, selectedFoodOption, step]);

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <h2>Aký typ podniku hľadáte?</h2>
                        <div>
                            <button className={`answer-button ${selectedType === '' ? 'selected' : ''}`} onClick={() => handleTypeSelect('')}>Všetky</button>
                            {customVenueTypes.map(type => (
                                <button
                                    key={type}
                                    className={`answer-button ${selectedType === (type === 'fastfood' ? 'restaurant' : type) ? 'selected' : ''}`}
                                    onClick={() => handleTypeSelect(type)}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 2:
                if (selectedType === 'restaurant') {
                    return (
                        <div>
                            <h2>Akú kuchyňu preferujete?</h2>
                            <div>
                                <button className={`answer-button ${selectedSubType === '' ? 'selected' : ''}`} onClick={() => handleSubTypeSelect('')}>Všetky</button>
                                {subTypes.map(subType => (
                                    <button
                                        key={subType}
                                        className={`answer-button ${selectedSubType === subType ? 'selected' : ''}`}
                                        onClick={() => handleSubTypeSelect(subType)}
                                    >
                                        {subType}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                } else if (selectedType === 'pub') {
                    return (
                        <div>
                            <h2>Na čo máte chuť?</h2>
                            <div>
                                <button className={`answer-button ${selectedDrink === '' ? 'selected' : ''}`} onClick={() => handleDrinkSelect('')}>Všetko</button>
                                {drinkOptions.map(drink => (
                                    <button
                                        key={drink}
                                        className={`answer-button ${selectedDrink === drink ? 'selected' : ''}`}
                                        onClick={() => handleDrinkSelect(drink)}
                                    >
                                        {drink}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                }
                return null;
            case 3:
                if (selectedDrink === 'pivo') {
                    return (
                        <div>
                            <h2>Aké pivo preferujete?</h2>
                            <div>
                                <button className={`answer-button ${selectedBeerType === '' ? 'selected' : ''}`} onClick={() => handleBeerTypeSelect('')}>Všetky</button>
                                {beerTypeOptions.map(beerType => (
                                    <button
                                        key={beerType}
                                        className={`answer-button ${selectedBeerType === beerType ? 'selected' : ''}`}
                                        onClick={() => handleBeerTypeSelect(beerType)}
                                    >
                                        {beerType}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                } else if (selectedDrink === 'tvrdý alkohol') {
                    return (
                        <div>
                            <h2>Aký typ alkoholu preferujete?</h2>
                            <div>
                                <button className={`answer-button ${selectedSpiritType === '' ? 'selected' : ''}`} onClick={() => handleSpiritTypeSelect('')}>Všetko</button>
                                {spiritTypeOptions.map(spiritType => (
                                    <button
                                        key={spiritType}
                                        className={`answer-button ${selectedSpiritType === spiritType ? 'selected' : ''}`}
                                        onClick={() => handleSpiritTypeSelect(spiritType)}
                                    >
                                        {spiritType}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                }
                return null;
            case 4:
                return (
                    <div>
                        <h2>Čo si dáte k pitiu?</h2>
                        <div>
                            <button className={`answer-button ${selectedFoodOption === '' ? 'selected' : ''}`} onClick={() => handleFoodOptionSelect('')}>Všetko</button>
                            {foodOptions.map(foodOption => (
                                <button
                                    key={foodOption}
                                    className={`answer-button ${selectedFoodOption === foodOption ? 'selected' : ''}`}
                                    onClick={() => handleFoodOptionSelect(foodOption)}
                                >
                                    {foodOption}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div>
                        <h2>Vaše odporúčania:</h2>
                        {filteredVenues.length > 0 ? (
                            filteredVenues.map(venue => (
                                <div key={venue.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '15px', borderRadius: '8px' }}>
                                    <h2>{venue.name}</h2>
                                    <p><strong>Typ:</strong> {venue.type}</p>
                                    <p><strong>Adresa:</strong> {venue.address}</p>
                                    <p><strong>Hodnotenie:</strong> {venue.reviews || 'N/A'}</p>
                                    {venue.website && <p><a href={venue.website} target="_blank" rel="noopener noreferrer">Web</a></p>}
                                    {venue.image && <img src={venue.image} alt={`Image of ${venue.name}`} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', marginTop: '10px' }} />}
                                </div>
                            ))
                        ) : (
                            <p>Žiadne výsledky neboli nájdené pre dané kritériá.</p>
                        )}
                        <button className="answer-button" onClick={() => setStep(1)}>Začať odznova</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="slider-container">
            <style>{sliderStyles}</style>
            <h1>Dotazník pre vyhľadávanie podnikov</h1>
            {renderStep()}
        </div>
    );
};

export default VenueFinder;