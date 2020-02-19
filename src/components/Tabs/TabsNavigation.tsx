import React from 'react';
import classNames from 'classnames';
import { Link as RouterLink, useLocation, matchPath } from 'react-router-dom';
import { Flex, Box } from 'rebass';

const Tab = (props: any) => (
    <Box
        as={RouterLink}
        {...props}
    />
);

export const TabsNavigation = <T extends TabIndex>({ tabs }: TabsProps<T>) => {
    const location = useLocation();

    return (
        <Flex as="nav" variant="nav">
            {
                tabs.map((tab) => (
                    <Tab
                        variant="nav.item"
                        to={tab.path}
                        key={`tab-nav-${tab.index}`}
                        className={classNames(
                            {
                                'active': matchPath(
                                    location.pathname,
                                    { path: tab.match || tab.path }
                                )
                            }
                        )}
                    >
                        { tab.name }
                    </Tab>
                ))
            }
        </Flex>
    );
};
