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

export default function PokemonCard({
  pokemon,
  onSpeakClick,
}: {
  pokemon: ClientPokemon;
  onSpeakClick: Function;
}) {
  const { name } = pokemon;
  const url = `https://img.pokemondb.net/artwork/large/${name}.jpg`;

  return (
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
      </CardActions>
    </Card>
  );
}
