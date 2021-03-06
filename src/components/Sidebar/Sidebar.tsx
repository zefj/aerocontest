import React from 'react';

import { Switch, Route } from 'react-router-dom';

import { RouteStep } from '../RouteStep/RouteStep';

import './sidebar.css';
import { Box, Flex, Heading, Text } from 'rebass';
import { WelcomeStep } from '../WelcomeStep/WelcomeStep';
import { ExternalLinkButton, LinkButton } from '../Button';
import { TrackStep } from '../TrackStep/TrackStep';
import { SummaryStep } from '../SummaryStep/SummaryStep';

export const Sidebar: React.FC = () => {
    return (
        <Box
            sx={{
                position: 'absolute',
                zIndex: 500,
                height: '100%',
            }}
            className="sidebar"
        >
            <Flex
                variant="sidebar"
                flexDirection="column"
                bg="background"
                sx={{
                    height: '100%',
                }}
            >
                <Flex variant="header">
                    <Heading variant="heading.h2" mb="0">
                        <Text as="span" color="primary">AERO</Text>
                        <Text as="span" color="muted" fontWeight="normal">CONTEST</Text>
                    </Heading>

                    <ExternalLinkButton
                        href="https://github.com/zefj/aerocontest"
                        variant="github"
                        icon="fab fa-github"
                    />
                </Flex>

                <Box variant="sidebarContent">
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

                            <LinkButton to="/export" variant="primaryOutline">
                                Eksportuj dane
                            </LinkButton>
                        </Route>
                    </Switch>
                </Flex>
            </Flex>
        </Box>
    );
};
