export interface AppConfig {
  themes: Theme[];
  layout: Layout;
  general: GeneralConfig;
}

export interface GeneralConfig {
  iconStyle: 'solid' | 'regular';
  brand: {
    logoUrl: string,
    logoUrlDark: string,
    images: {name: string, url: string}[]
  }
}

export interface Theme {
  name: string;
  isDark: boolean;
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
  logoUrl: string,
  logoUrlDark: string,
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
  logoUrl: string,
  logoUrlDark: string,
}

export interface Footer {
  message: string;
  navigations: Navigation[];
  logoUrl: string,
  logoUrlDark: string,
}
