export interface AppConfig {
    themes: Theme[];
    layout: Layout;
    general: GeneralConfig;
}

export interface GeneralConfig {
  iconStyle: 'solid' | 'regular';
}

export interface Theme {
    name: string;
    logo: string;
}

export interface Layout {
    name: string;
    navbar: NavBar;
    sidenav?: Sidenav;
    footer: Footer;
}
export interface Navigation {
    type: 'default' | 'dynamic' | 'selector';
    label: string;
    routerLink: string;
    component?: string;
    cssClass?: string;
    childs?: Navigation[];
    icon?: string
}

export interface NavBar {
    navigations: Navigation[];
    configs: {
        showThemeSelector: boolean;
        showLanguageSelector: boolean;
        showLogo: boolean;
    },
    visible: boolean;
}

export interface Sidenav {
    navigations: Navigation[];
    configs: {
        showThemeSelector: boolean;
        showLanguageSelector: boolean;
        showLogo: boolean;
        showAuthButtons: boolean;
    },
    visible: boolean;
}

export interface Footer {
    message: string;
    navigations: Navigation[];
}
