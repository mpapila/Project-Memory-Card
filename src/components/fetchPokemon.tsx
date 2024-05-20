import { useEffect, useState } from "react";

export interface Result {
    name: string;
    url: string;
}
export function useFetchPokemon(): Result[] {
    const [pokemonList, setPokemonList] = useState<Result[]>([]);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=9")
            .then((response) => {
                response.json().then((data: { results: Result[] }) => {
                    setPokemonList(data.results);
                }).catch((error) => {
                    console.log(error)
                });
            });
    }, []);

    return pokemonList;
}



export default useFetchPokemon;