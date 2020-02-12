import React from 'react';
import classNames from 'classnames';
import { Link, useLocation, matchPath } from 'react-router-dom';

export const TabsNavigation = <T extends TabIndex>({ tabs }: TabsProps<T>) => {
    const location = useLocation();

    return (
        <nav className="w-full flex text-center bg-yellow-400">
            {
                tabs.map((tab) => (
                    <Link
                        to={tab.path}
                        key={`tab-nav-${tab.index}`}
                        className={classNames(
                            'flex-auto p-3 text-sm cursor-pointer text-gray-700 hover:bg-yellow-500 border-b-4 border-solid border-yellow-500',
                            {
                                'text-gray-800 bg-yellow-500 border-yellow-700': matchPath(
                                    location.pathname,
                                    { path: tab.match || tab.path }
                                )
                            }
                        )}
                    >
                        { tab.name }
                    </Link>
                ))
            }
        </nav>
    );
};
