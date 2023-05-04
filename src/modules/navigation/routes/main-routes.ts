import { HomeRoutes } from "./home-routes";


export enum MainRoutes {
    HOME = 'Home',
    FAVORITES = 'Favorites',
    ACCOUNT = 'Account',
    HOME_TABS = "HOME_TABS",
    EDIT = 'Edit'
}


export type MainStackParamList = {
  [MainRoutes.HOME]: undefined;
  [MainRoutes.HOME_TABS]: {screen: HomeRoutes}
  [MainRoutes.FAVORITES]: undefined;
  [MainRoutes.ACCOUNT]: undefined;
  [MainRoutes.EDIT]: undefined;
};
