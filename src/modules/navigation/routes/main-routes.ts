

export enum MainRoutes {
    HOME = 'Home',
    FAVORITES = 'Favorites',
    ACCOUNT = 'Account',
    HOME_TABS = "HOME_TABS",
}


export type MainStackParamList = {
  [MainRoutes.HOME]: undefined;
  [MainRoutes.FAVORITES]: undefined;
  [MainRoutes.ACCOUNT]: undefined;
};
