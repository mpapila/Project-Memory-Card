import useFetchPokemon, { Result } from "./fetchPokemon";
import "./App.css";
import { extractIndexFromUrl } from "./Images";
import { useEffect, useState } from "react";

const shuffleArray = (input: any) => {
    const shuffledArray = [...input];
    shuffledArray.sort(() => Math.random() - 0.5);
    return shuffledArray;
};


const Card = () => {
    const pokemonList: Result[] = useFetchPokemon();
    const [InitialImages, setInitialImages] = useState<string[]>([]);
    const [clickedImages, setClickedImages] = useState<string[]>([]); // State to keep track of clicked images
    const [renderedImages, setRenderedImages] = useState<string[]>([]);
    const [score, setScore] = useState<number>(0)

    const reset = () => {
        setClickedImages([]);
        setRenderedImages(shuffleArray(renderedImages))
        setScore(0)
    }

    useEffect(() => {
        if (InitialImages.length === 0) { // The 'InitialImages' array must be empty for this section to operate correctly; otherwise, the useEffect hook will run continuously.
            const shuffledPokemons = shuffleArray(pokemonList);
            const shuffledImagesUrls: string[] = shuffledPokemons.map(pokemon => `../images/${extractIndexFromUrl(pokemon.url)}.png`);
            setInitialImages(shuffledImagesUrls);
        }
    }, [InitialImages, pokemonList]);

    useEffect(() => {
        // Set renderedImages when InitialImages is set
        if (InitialImages.length > 0) {
            setRenderedImages(InitialImages);
        }
    }, [InitialImages]);

    console.log('Initial Images', InitialImages)
    console.log('rendered images', renderedImages)
    console.log('clickedImages', clickedImages)
    console.log('score', score)
    const handleClick: React.MouseEventHandler<HTMLImageElement> = (event) => {
        const clickedImage = event.currentTarget.src;
        if (clickedImages.includes(clickedImage)) {
            alert("This image is already clicked!");
            reset();
            return;
        }

        setClickedImages([...clickedImages, clickedImage]);
        const shuffledArray = shuffleArray(renderedImages)
        setRenderedImages(shuffledArray)
        setScore(score + 1)
    };


    return (
        <div className="main">
            {renderedImages.map((imageUrl, index) => {
                return (
                    <span id='each' key={index}>
                        <div>
                            <img src={imageUrl}
                                data-index={index}
                                onClick={handleClick}
                            />
                        </div>
                    </span>
                );
            })}
        </div>
    );
};

export default Card;