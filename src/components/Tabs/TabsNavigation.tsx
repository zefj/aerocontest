import React from 'react';
import classNames from 'classnames';

export const TabsNavigation = <T extends TabIndex>({
    tabs,
    active,
    setTab
}: TabsProps<T>) => {
    return (
        <nav className="w-full flex text-center bg-yellow-400">
            {
                tabs.map((tab) => (
                    <button
                        key={`tab-nav-${tab.index}`} 
                        className={classNames(
                            'flex-auto p-3 text-sm cursor-pointer text-gray-700 hover:bg-yellow-500 border-b-4 border-solid border-yellow-500',
                            {
                                'text-gray-800 bg-yellow-500 border-yellow-700': tab.index === active
                            }
                        )}
                        onClick={() => setTab(tab.index)}
                    >
                        { tab.name }
                    </button>
                ))
            }
        </nav>
    );
};