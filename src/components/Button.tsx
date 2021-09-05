import React, { ReactNode } from "react";
import {
  Button as RebassButton,
  Link as RebassLink,
  ButtonProps,
  LinkProps as RebassLinkProps,
} from "rebass";
import { space } from "../styles/theme";
import { Link, LinkProps } from "react-router-dom";

interface CustomButtonProps extends ButtonProps {
  icon?: string;
  children?: ReactNode;
}

export const Button = ({ children, icon, ...restProps }: CustomButtonProps) => (
  <RebassButton {...restProps}>
    {icon && (
      <i
        className={`${icon}`}
        style={{ marginRight: children ? space["4"] : 0 }}
      />
    )}
    {children}
  </RebassButton>
);

export const LinkButton = (props: CustomButtonProps & LinkProps) => (
  <Button as={Link} {...props} />
);

export const ExternalLinkButton = ({
  href,
  ...props
}: CustomButtonProps & RebassLinkProps) => (
  <Button as={RebassLink} href={href} {...props} />
);
