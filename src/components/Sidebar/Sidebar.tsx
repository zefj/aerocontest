import React from 'react';

import { Switch, Route } from 'react-router-dom';

import { TabsNavigation } from '../Tabs/TabsNavigation';
import { RouteTab } from '../RouteTab/RouteTab';

import './sidebar.css';
import { Box, Flex } from 'rebass';

type ControlTabs = 'route' | 'track';

const tabs: Tab<ControlTabs>[] = [
    {
        index: 'route',
        path: '/route',
        match: '/(route|)',
        name: 'Trasa',
    },
    {
        index: 'track',
        path: '/track',
        name: 'Tor',
    }
];

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
                <TabsNavigation tabs={tabs} />

                <Box variant="sidebarContent">
                    <Switch>
                        <Route path="/(route|)">
                            <RouteTab />
                        </Route>

                        <Route path="/track">

                        </Route>
                    </Switch>
                </Box>
            </Flex>

            {/*<div className="flex flex-col bg-white h-full rounded shadow-lg overflow-hidden">*/}
            {/*</div>*/}
        </Box>
    );
};
