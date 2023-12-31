const themeNames = [
    "bootstrap4-light-blue",
    "bootstrap4-light-purple",
    "bootstrap4-dark-blue",
    "bootstrap4-dark-purple",
    "md-light-indigo",
    "md-light-deeppurple",
    "md-dark-indigo",
    "md-dark-deeppurple",
    "mdc-light-indigo",
    "mdc-light-deeppurple",
    "mdc-dark-indigo",
    "mdc-dark-deeppurple",
    "fluent-light",
    "lara-light-blue",
    "lara-light-indigo",
    "lara-light-purple",
    "lara-light-teal",
    "lara-dark-blue",
    "lara-dark-indigo",
    "lara-dark-purple",
    "lara-dark-teal",
    "soho-light",
    "soho-dark",
    "viva-light",
    "viva-dark",
    "mira",
    "nano",
    "saga-blue",
    "saga-green",
    "saga-orange",
    "saga-purple",
    "vela-blue",
    "vela-green",
    "vela-orange",
    "vela-purple",
    "arya-blue",
    "arya-green",
    "arya-orange",
    "arya-purple"
] as const;


export type PrimeVueTheme = typeof themeNames[number];
