import React, { useContext } from "react";
import { useSelector } from "react-redux";

import { Switch, Route } from "react-router-dom";

import { RouteStep } from "../RouteStep/RouteStep";

import "./sidebar.css";
import { Box, Flex, Heading, Text } from "rebass";
import { WelcomeStep } from "../WelcomeStep/WelcomeStep";
import { Button, ExternalLinkButton, LinkButton } from "../Button";
import { TrackStep } from "../TrackStep/TrackStep";
import { SummaryStep } from "../SummaryStep/SummaryStep";

import { getRoutes, getRoutesAnalysis } from "../../state/routes/routesReducer";
import { exportData } from "../../utils/exportData";
import { space } from "../../styles/theme";
import { RouteLayersContext } from "../../state/store";

export const Sidebar: React.FC = () => {
  const analysis = useSelector(getRoutesAnalysis);
  const routes = useSelector(getRoutes);
  const { layers } = useContext(RouteLayersContext);

  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 500,
        height: "100%",
      }}
      className="sidebar"
    >
      <Flex
        variant="sidebar"
        flexDirection="column"
        bg="background"
        sx={{
          height: "100%",
        }}
      >
        <Flex variant="header">
          <Heading variant="heading.h2" mb="0">
            <Text as="span" color="primary">
              AERO
            </Text>
            <Text as="span" color="muted" fontWeight="normal">
              CONTEST
            </Text>
          </Heading>

          <ExternalLinkButton
            href="https://github.com/zefj/aerocontest"
            variant="github"
            icon="fab fa-github"
          />
        </Flex>

        <Box variant="content">
          <Switch>
            <Route path="/(welcome|)">
              <WelcomeStep />
            </Route>

            <Route path="/route">
              <RouteStep />
            </Route>

            <Route path="/track">
              <TrackStep />
            </Route>

            <Route path="/summary">
              <SummaryStep />
            </Route>
          </Switch>
        </Box>

        <Flex as="nav" variant="nav">
          <Switch>
            <Route path="/(welcome|)">
              <LinkButton to="/route" variant="primary">
                Zaczynamy
              </LinkButton>
            </Route>

            <Route path="/(route|)">
              <LinkButton to="/welcome" variant="secondaryOutline">
                Wróć
              </LinkButton>

              <LinkButton to="/track" variant="primary">
                Wyznacz trasę
              </LinkButton>
            </Route>

            <Route path="/track">
              <LinkButton to="/route" variant="secondaryOutline">
                Wróć
              </LinkButton>

              <LinkButton to="/summary" variant="primary">
                Podsumowanie
              </LinkButton>
            </Route>

            <Route path="/summary">
              <LinkButton to="/track" variant="secondaryOutline">
                Wróć
              </LinkButton>

              <Button
                onClick={() => exportData(routes, layers, analysis)}
                sx={{
                  marginLeft: space["8"],
                }}
                variant="primaryOutline"
              >
                Eksportuj dane
              </Button>
            </Route>
          </Switch>
        </Flex>
      </Flex>
    </Box>
  );
};
