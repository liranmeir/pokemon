import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ClientPokemon } from "./types";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { Grid } from "@mui/material";

function PokemonCard({
  pokemon,
  onSpeakClick,
  onFavoriteClick,
}: {
  pokemon: ClientPokemon;
  onSpeakClick: Function;
  onFavoriteClick: Function;
}) {
  const { name, isFavorite } = pokemon;
  const url = `https://img.pokemondb.net/artwork/large/${name}.jpg`;
  console.log(name);

  return (
    <Grid item>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={name.toUpperCase()}
          subheader=""
        />
        <CardMedia component="img" image={url} alt="Paella dish" />
        <CardContent></CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="Audiotrack"
            onClick={() => {
              onSpeakClick(name);
            }}
          >
            <AudiotrackIcon />
          </IconButton>
          <IconButton
            aria-label="Audiotrack"
            onClick={() => {
              onFavoriteClick(name, !isFavorite);
            }}
          >
            <FavoriteIcon style={{ color: isFavorite && red[500] }} />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

// export default PokemonCard;

export default React.memo(PokemonCard, (prevProps, nextProps) => {
  return (
    prevProps.pokemon.name === nextProps.pokemon.name &&
    prevProps.pokemon.isFavorite === nextProps.pokemon.isFavorite
  );
});
