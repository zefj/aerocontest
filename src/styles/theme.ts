// import { DefaultTheme } from 'styled-components';

// Palette 20
const palette = {
  // Primary
  "light-blue-050": "#EBF8FF",
  "light-blue-100": "#D1EEFC",
  "light-blue-200": "#A7D8F0",
  "light-blue-300": "#7CC1E4",
  "light-blue-400": "#55AAD4",
  "light-blue-500": "#3994C1",
  "light-blue-600": "#2D83AE",
  "light-blue-700": "#1D6F98",
  "light-blue-800": "#166086",
  "light-blue-900": "#0B4F71",

  "green-050": "#E3F9E5",
  "green-100": "#C1EAC5",
  "green-200": "#A3D9A5",
  "green-300": "#7BC47F",
  "green-400": "#57AE5B",
  "green-500": "#3F9142",
  "green-600": "#2F8132",
  "green-700": "#207227",
  "green-800": "#0E5814",
  "green-900": "#05400A",

  // Neutrals
  "cool-grey-050": "#F5F7FA",
  "cool-grey-100": "#E4E7EB",
  "cool-grey-200": "#CBD2D9",
  "cool-grey-300": "#9AA5B1",
  "cool-grey-400": "#7B8794",
  "cool-grey-500": "#616E7C",
  "cool-grey-600": "#52606D",
  "cool-grey-700": "#3E4C59",
  "cool-grey-800": "#323F4B",
  "cool-grey-900": "#1F2933",

  // Supporting
  "purple-050": "#EAE2F8",
  "purple-100": "#CFBCF2",
  "purple-200": "#A081D9",
  "purple-300": "#8662C7",
  "purple-400": "#724BB7",
  "purple-500": "#653CAD",
  "purple-600": "#51279B",
  "purple-700": "#421987",
  "purple-800": "#34126F",
  "purple-900": "#240754",

  "red-050": "#FFEEEE",
  "red-100": "#FACDCD",
  "red-200": "#F29B9B",
  "red-300": "#E66A6A",
  "red-400": "#D64545",
  "red-500": "#BA2525",
  "red-600": "#A61B1B",
  "red-700": "#911111",
  "red-800": "#780A0A",
  "red-900": "#610404",

  "yellow-050": "#FFFAEB",
  "yellow-100": "#FCEFC7",
  "yellow-200": "#F8E3A3",
  "yellow-300": "#F9DA8B",
  "yellow-400": "#F7D070",
  "yellow-500": "#E9B949",
  "yellow-600": "#C99A2E",
  "yellow-700": "#A27C1A",
  "yellow-800": "#7C5E10",
  "yellow-900": "#513C06",
};

// Spacing and sizing system
// Defined as constants to allow explicit references, instead of the ridiculous ambiguous default way
export const fontSize = {
  body: "14px",
  12: `${12 / 16}rem`,
  14: `${14 / 16}rem`,
  16: `${16 / 16}rem`,
  18: `${18 / 16}rem`,
  20: `${20 / 16}rem`,
  24: `${24 / 16}rem`,
  30: `${30 / 16}rem`,
  36: `${36 / 16}rem`,
  48: `${48 / 16}rem`,
};

export const space = {
  4: `${4 / 16}rem`,
  8: `${8 / 16}rem`,
  12: `${12 / 16}rem`,
  16: `${16 / 16}rem`,
  24: `${24 / 16}rem`,
  32: `${32 / 16}rem`,
  48: `${48 / 16}rem`,
  64: `${64 / 16}rem`,
  96: `${96 / 16}rem`,
  128: `${128 / 16}rem`,
};

const preset = {
  colors: {
    text: palette["cool-grey-800"],
    textLight: palette["cool-grey-050"],
    background: "#fff",
    primary: palette["purple-500"],
    secondary: palette["cool-grey-400"],
    muted: palette["cool-grey-500"],
    gray: palette["cool-grey-300"],
    highlight: "hsla(205, 100%, 40%, 0.125)",

    header: palette["cool-grey-200"],
  },
  fonts: {
    body: "Lato, system-ui, sans-serif",
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  fontSizes: fontSize,
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  space,
  radii: {
    default: ".375rem",
  },
  shadows: {
    card: "0 0 4px rgba(0, 0, 0, .125)",
  },
  input: {
    marginRight: space["8"],
    padding: space["8"],
    border: "0",
    boxShadow: "inset 0 0 2px",
  },
  // rebass variants
  text: {
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
      letterSpacing: "-1px",
      fontSize: fontSize["48"],

      h1: {
        letterSpacing: "-1px", // nesting doesn't seem to inherit values... this is kinda dumb
        marginBottom: space["12"],
        fontSize: fontSize["48"],
      },
      h2: {
        letterSpacing: "-1px",
        marginBottom: space["12"],
        fontSize: fontSize["30"],
      },
      h3: {
        letterSpacing: "-1px",
        marginBottom: space["12"],
        fontSize: fontSize["24"],
      },
      h4: {
        letterSpacing: "-1px",
        marginBottom: space["12"],
        fontSize: fontSize["20"],
      },
    },
    display: {
      fontFamily: "heading",
      fontWeight: "heading",
      lineHeight: "heading",
      fontSize: [fontSize["24"], fontSize["30"], fontSize["36"]],
    },
    caps: {
      textTransform: "uppercase",
      letterSpacing: "0.1em",
    },
    iconButtonText: {
      marginLeft: space["8"],
    },
    routeName: {
      marginRight: space["8"],
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      marginBottom: 0,
      fontSize: fontSize["20"],

      editable: {
        marginRight: space["8"],
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        marginBottom: 0,
        fontSize: fontSize["16"],
      },
    },
    instruction: {
      fontSize: fontSize["12"],
      color: "muted",
    },
  },
  variants: {
    header: {
      backgroundColor: "header",
      letterSpacing: "-2px",
      padding: space["16"],
      justifyContent: "space-between",
      alignItems: "center",
    },
    sidebar: {
      // This is stolen from leaflet control css, but I don't like it, so TODO
      boxShadow: "0 1px 5px rgba(0,0,0,0.65)",
      borderRadius: "default",
      overflow: "hidden",
    },
    popup: {
      variant: "variants.sidebar",
      marginTop: space["12"],
      backgroundColor: "rgb(255 255 255 / 90%)",
    },
    content: {
      px: space["24"],
      py: space["16"],
      overflow: "auto",
      overflowX: "hidden",
    },
    container: {
      marginBottom: space["16"],
    },
    label: {
      marginBottom: space["4"],
    },
    description: {
      marginBottom: space["16"],
    },
    alert: {
      marginBottom: space["16"],
      iconContainer: {
        borderRadius: "50%",
        backgroundColor: palette["yellow-300"],
        width: fontSize["24"],
        height: fontSize["24"],
        alignItems: "center",
        justifyContent: "center",
        marginRight: space["8"],
      },
      icon: {
        color: palette["yellow-800"],
        boxShadow: 0,
        padding: 0,
      },
    },
    link: {
      color: "primary",
    },
    nav: {
      px: space["24"],
      py: space["16"],
      justifyContent: "center",
      marginTop: "auto",

      "*:not(:only-child):not(:first-of-type)": {
        marginLeft: space["8"],
      },
    },
    routeSummary: {
      pb: space["16"],
    },

    table: {
      width: "100%",
      textAlign: "center",
      borderSpacing: 0,
    },
    th: {
      px: space["4"],
      py: space["8"],
    },
    td: {
      px: space["4"],
      py: space["8"],
      borderBottom: "solid 1px",
      borderColor: palette["cool-grey-100"],
    },
    highlightedRow: {
      fontWeight: "bold",
      backgroundColor: palette["cool-grey-100"],
    },
  },
  buttons: {
    primary: {
      cursor: "pointer",
      fontSize: fontSize["16"],
      color: "background",
      bg: "primary",
      borderRadius: "default",
      px: space["16"],
      py: space["8"],
    },
    outline: {
      variant: "buttons.primary",
      color: "primary",
      bg: "transparent",
      boxShadow: "inset 0 0 2px",
    },
    primaryOutline: {
      variant: "buttons.outline",
    },
    secondary: {
      variant: "buttons.primary",
      color: "background",
      bg: "secondary",
    },
    secondaryOutline: {
      variant: "buttons.outline",
      color: "secondary",
    },
    greenOutline: {
      variant: "buttons.outline",
      color: palette["green-600"],
      ":hover:not(.active), :focus:not(.active)": {
        color: "background",
        bg: palette["green-600"],
      },
    },
    destructive: {
      variant: "buttons.primary",
      bg: palette["red-600"],
      color: "background",
    },
    destructiveOutline: {
      variant: "buttons.outline",
      color: palette["red-500"],
      ":hover:not(.active), :focus:not(.active)": {
        color: "background",
        bg: palette["red-600"],
      },
    },
    icon: {
      variant: "buttons.outline",
      color: "muted",
      boxShadow: 0,
      padding: 0,
    },

    github: {
      variant: "buttons.outline",
      boxShadow: 0,
      fontSize: fontSize["24"],
      color: "muted",
      ":hover:not(.active), :focus:not(.active)": {
        color: "primary",
      },
    },
  },
};

export const theme: any = {
  ...preset,
  palette,
};
