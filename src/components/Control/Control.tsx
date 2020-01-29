import React from 'react';
import { useTabs } from '../Tabs/useTabs';
import { TabsNavigation } from '../Tabs/TabsNavigation';

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

export const Control: React.FC = () => {
    const [tab, setTab] = useTabs<ControlTabs>('route');
    
    return (
        <div className="absolute z-400 h-full p-4 max-w-sm">
            <div className="flex flex-col bg-white h-full rounded shadow-lg overflow-hidden">

                <TabsNavigation tabs={tabs} active={tab} setTab={setTab} />

                { tab === 'route' && (
                    <div className="px-6 py-4 overflow-auto">
                        <div className="font-bold text-xl mb-2">Route</div>
                        <p className="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.

                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                        </p>
                    </div>
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