import { useCallback, useEffect, useState } from "react";
import PokemonCard from "./PkemonCard";
import { Box, Grid, Chip, AppBar } from "@mui/material";
import { ClientPokemon, PokemonsResponse } from "./types";

// @ts-ignore
import { useSpeechSynthesis } from "react-speech-kit";
import { useDidMount } from "./useDidMount";
const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];

const getFavoritePokemonHash = () => {
  const favoritePokemonsHash =
    JSON.parse(window.localStorage.getItem("favoritePokemonsHash") || "{}") ||
    {};

  return favoritePokemonsHash;
};

function App() {
  const isFirstRenderFn = useDidMount();

  const [pokemons, setPokemons] = useState<ClientPokemon[]>([]);
  const [filterBy, setFilterBy] = useState<string>("");

  const pokemonsFlittered = pokemons.filter((p) => p.name.startsWith(filterBy));

  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    if (!isFirstRenderFn()) {
      const favoritePokemons = pokemons.filter((p) => p.isFavorite);
      const favoritePokemonsHash = Object.fromEntries(
        favoritePokemons.map((e) => [e.name, e.isFavorite])
      );

      window.localStorage.setItem(
        "favoritePokemonsHash",
        JSON.stringify(favoritePokemonsHash)
      );
    }
  }, [pokemons]);

  useEffect(() => {
    async function initPokemons(favoritePokemonsHash: {
      [name: string]: boolean;
    }) {
      const response: PokemonsResponse = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=500"
      ).then((response) => response.json());

      const initialPokemons = response.results.map(({ name }) => ({
        name,
        isFavorite: favoritePokemonsHash[name] || false,
      }));

      setPokemons(initialPokemons);
    }
    const favoritePokemonsHash = getFavoritePokemonHash();
    initPokemons(favoritePokemonsHash);
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
            <Grid item justifyContent="spaceBetween" key={letter}>
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
              <Grid item key={pokemon.name}>
                <PokemonCard
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
