import React from "react";
import { Box, Heading, Text } from "rebass";
import { fontSize, space } from "../../styles/theme";

import { Uploader } from "../Uploader/Uploader";
import { RouteRecord } from "./RouteRecord";
import { useSelector } from "react-redux";
import { getRoutes } from "../../state/routes/routesReducer";

export const RouteStep: React.FC = () => {
  const routes = useSelector(getRoutes);
  const amountOfRoutes = Object.keys(routes).length;

  return (
    <>
      <Text
        fontSize={fontSize["16"]}
        // fontWeight='bold'
        color="text"
        sx={{
          textAlign: "justify",
          whiteSpace: "pre-line",
          marginBottom: space["32"],
        }}
      >
        <p>
          Witaj w aplikacji przeznaczonej do analizy tras <code>.gpx</code>.
          Dzięki interaktywnej mapie porównasz załadowane trasy z wyznaczonym
          torem, otrzymując szczegółowe informacje i podsumowanie dla każdej z
          nich.
        </p>

        <p>
          Projekt powstał na potrzeby organizacji amatorskich zawodów lotniczych
          przez członków Aeroklubu Szczecińskiego.
        </p>
      </Text>

      <Box variant="container">
        <Uploader />
      </Box>

      {amountOfRoutes > 0 && (
        <Box variant="container">
          <Heading variant="heading.h3">Załadowane przebiegi</Heading>
        </Box>
      )}

      {amountOfRoutes === 0 && (
        <Text>
          Nie załadowano żadnych tras, przeciągnij pliki <code>.gpx</code> do
          okna powyżej, lub użyj przeglądarki plików.
        </Text>
      )}

      {Object.entries(routes).map(([_key, route]) => (
        <RouteRecord key={`route-${route.id}`} route={route} />
      ))}
    </>
  );
};
