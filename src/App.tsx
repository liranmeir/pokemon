import { useEffect, useState } from "react";
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

      const pokemonsNames = response.results.map(({ name }) => ({ name }));
      setPokemons(pokemonsNames);
    }
    initPokemons();
  }, []);

  const handleSpeakClick = (name: string) => {
    speak({ text: name });
  };

  return (
    <div className="App">
      <Grid container spacing={2}>
        {pokemons.map((pokemon, index) => (
          <Grid item key={index}>
            <PokemonCard
              pokemon={pokemon}
              onSpeakClick={handleSpeakClick}
            ></PokemonCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;
