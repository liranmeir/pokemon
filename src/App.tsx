import { useCallback, useEffect, useState } from "react";
import PokemonCard from "./PkemonCard";
import { Box, Grid, Chip, AppBar } from "@mui/material";
import { ClientPokemon, PokemonsResponse } from "./types";

// @ts-ignore
import { useSpeechSynthesis } from "react-speech-kit";
const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];

function App() {
  const [pokemons, setPokemons] = useState<ClientPokemon[]>([]);
  const [filterBy, setFilterBy] = useState<string>("");

  const pokemonsFlittered = pokemons.filter((p) => p.name.startsWith(filterBy));

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
      <AppBar position="fixed">
        <Grid container spacing={2} padding={2}>
          <Grid item>
            <Chip
              color="primary"
              label={"All"}
              onClick={() => {
                setFilterBy("");
              }}
            ></Chip>
          </Grid>
          {alphabet.map((letter) => (
            <Grid item justifyContent="spaceBetween">
              <Box>
                <Chip
                  color="primary"
                  label={letter.toUpperCase()}
                  onClick={() => {
                    setFilterBy(letter);
                  }}
                ></Chip>
              </Box>
            </Grid>
          ))}
        </Grid>
      </AppBar>
      <Grid container paddingTop={8}>
        <Grid item>
          <Grid container spacing={2}>
            {pokemonsFlittered.map((pokemon) => (
              <Grid item>
                <PokemonCard
                  key={pokemon.name}
                  pokemon={pokemon}
                  onSpeakClick={handleSpeakClick}
                  onFavoriteClick={handleFavoriteClick}
                ></PokemonCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
