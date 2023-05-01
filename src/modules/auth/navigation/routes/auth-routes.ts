export enum AuthRoutes {
  LOGIN = 'Login',
  SIGNUP = 'SignUp',
  AUTH = 'Authentication'
}

export type AuthStackParamList = {
  [AuthRoutes.LOGIN]: undefined;
  [AuthRoutes.SIGNUP]: undefined;
};
