import React, { ReactNode } from 'react';
import { Button as RebassButton, ButtonProps } from 'rebass';
import { space } from '../styles/theme';

interface CustomButtonProps extends ButtonProps {
    icon?: string,
    children?: ReactNode,
}

export const Button = ({ children, icon, ...restProps }: CustomButtonProps) => (
    <RebassButton {...restProps}>
        {icon && (
            <i
                className={`fa-fw ${icon}`}
                style={{ marginRight: (children ? space['4'] : 0) }}
            />
        )}
        {children}
    </RebassButton>
);
