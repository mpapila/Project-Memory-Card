import useFetchPokemon, { Result } from "./fetchPokemon";

function extractIndexFromUrl(url: string): number {
    // Extracting the index from the URL
    const parts = url.split('/');
    return parseInt(parts[parts.length - 2]);
}

const Images = (): string[] => {
    const pokemonList: Result[] = useFetchPokemon();

    const images: string[] = pokemonList.map((pokemon) => {
        return `../images/${extractIndexFromUrl(pokemon.url)}.png`
    });

    return images; // Return the images array
}

export { extractIndexFromUrl, Images };