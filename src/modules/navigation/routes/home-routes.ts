export enum HomeRoutes {
    HOME = 'Home',
    FAVORITES = 'Favorites',
    ACCOUNT = 'Account',
}

export type HomeTabsParamList = {
  [HomeRoutes.HOME]: undefined;
  [HomeRoutes.FAVORITES]: undefined;
  [HomeRoutes.ACCOUNT]: undefined;
}

