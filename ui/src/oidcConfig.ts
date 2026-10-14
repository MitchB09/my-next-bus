import type { User } from "oidc-client-ts";

export const oidcConfig = {
  authority: `https://cognito-idp.us-east-1.amazonaws.com/${import.meta.env.VITE_USERPOOL_ID as string}`,
  client_id: import.meta.env.VITE_USERPOOL_CLIENT_ID as string,
  redirect_uri: import.meta.env.VITE_REDIRECT_URL as string,
  response_type: "code",
  scope: "email openid",
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  onSigninCallback: (user: User | void): void => {
    console.dir(user)
     window.history.replaceState(
         {},
         document.title,
         window.location.pathname
     )
 },
};

export default oidcConfig;