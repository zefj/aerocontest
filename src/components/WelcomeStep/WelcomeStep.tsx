import React from "react";
import { Text } from "rebass";
import { fontSize } from "../../styles/theme";

export const WelcomeStep: React.FC = () => (
  <>
    <Text
      fontSize={fontSize["18"]}
      // fontWeight='bold'
      color="text"
      sx={{
        textAlign: "justify",
        whiteSpace: "pre-line",
      }}
    >
      <p>
        Witaj w aplikacji przeznaczonej do analizy tras <code>.gpx</code>.
        Dzięki interaktywnej mapie, porównasz załadowane trasy z wyznaczonym
        torem, otrzymując szczegółowe informacje, podsumowanie i punktacje dla
        każdej z nich.
      </p>

      <p>
        Projekt powstał na potrzeby organizacji amatorskich zawodów lotniczych
        przez członków Aeroklubu Szczecińskiego.
      </p>
    </Text>
  </>
);
