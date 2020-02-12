import React from 'react';

import { Switch, Route } from 'react-router-dom';

import { TabsNavigation } from '../Tabs/TabsNavigation';
import { RouteTab } from '../RouteTab/RouteTab';

import './sidebar.css';

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
        <div className="sidebar absolute z-500 h-full">
            <div className="flex flex-col bg-white h-full rounded shadow-lg overflow-hidden">
                <TabsNavigation tabs={tabs} />

                <Switch>
                    <Route path="/(route|)">
                        <RouteTab />
                    </Route>

                    <Route path="/track">
                        <div className="px-6 py-4 overflow-auto">
                            <div className="font-bold text-xl mb-2">Track</div>
                            <p className="text-gray-700 text-base">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.

                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                    </Route>
                </Switch>
            </div>
        </div>
    );
};
