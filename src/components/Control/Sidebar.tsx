import React from 'react';
import { useTabs } from '../Tabs/useTabs';
import { TabsNavigation } from '../Tabs/TabsNavigation';
import { RouteTab } from '../RouteTab/RouteTab';

import './sidebar.css';

type ControlTabs = 'route' | 'track';

const tabs: Tab<ControlTabs>[] = [
    {
        index: 'route',
        name: 'Trasa'
    },
    {
        index: 'track',
        name: 'Tor'
    }
];

export const Sidebar: React.FC = () => {
    const [tab, setTab] = useTabs<ControlTabs>('route');

    return (
        <div className="sidebar absolute z-500 h-full">
            <div className="flex flex-col bg-white h-full rounded shadow-lg overflow-hidden">
                <TabsNavigation tabs={tabs} active={tab} setTab={setTab} />

                { tab === 'route' && (
                    <RouteTab />
                ) }

                { tab === 'track' && (
                    <div className="px-6 py-4 overflow-auto">
                        <div className="font-bold text-xl mb-2">Track</div>
                        <p className="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.

                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        </p>
                    </div>
                ) }

            </div>
        </div>
    );
};
