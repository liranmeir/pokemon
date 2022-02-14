import { useCallback, useEffect, useState } from "react";
import PokemonCard from "./PkemonCard";
import { Grid } from "@mui/material";
import { ClientPokemon, PokemonsResponse } from "./types";

// @ts-ignore
import { useSpeechSynthesis } from "react-speech-kit";

function App() {
  const [pokemons, setPokemons] = useState<ClientPokemon[]>([]);
  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    async function initPokemons() {
      const response: PokemonsResponse = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=500"
      ).then((response) => response.json());

      const pokemons = response.results.map(({ name }) => ({
        name,
        isFavorite: false,
      }));
      setPokemons(pokemons);
    }
    initPokemons();
  }, []);

  const handleSpeakClick = useCallback(
    (name: string) => {
      speak({ text: name });
    },
    [speak]
  );

  const handleFavoriteClick = useCallback(
    (name: string, isFavorite: boolean) => {
      const newPokemons = pokemons.map((el) =>
        el.name === name ? { ...el, isFavorite } : el
      );

      setPokemons([...newPokemons]);
    },
    [pokemons]
  );

  return (
    <div className="App">
      <Grid container spacing={2}>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            onSpeakClick={handleSpeakClick}
            onFavoriteClick={handleFavoriteClick}
          ></PokemonCard>
        ))}
      </Grid>
    </div>
  );
}

export default App;
