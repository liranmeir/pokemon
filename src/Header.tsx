import { memo } from "react";
import { AppBar, Box, Chip, Grid } from "@mui/material";
const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];

function Header(setFilterBy: any) {
  return (
    <AppBar position="sticky">
      <Grid container spacing={2} padding={2} justifyContent="center">
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
  );
}

export default memo(Header);
