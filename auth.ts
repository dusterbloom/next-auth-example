import NextAuth from "next-auth"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import {
  Adapter,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from "@auth/core/adapters"
const secret = process.env.NEXTAUTH_SECRET ??"";


// import Apple from "next-auth/providers/apple"
// import Atlassian from "next-auth/providers/atlassian"
// import Auth0 from "next-auth/providers/auth0"
// import Authentik from "next-auth/providers/authentik"
// import AzureAD from "next-auth/providers/azure-ad"
// import AzureB2C from "next-auth/providers/azure-ad-b2c"
// import Battlenet from "next-auth/providers/battlenet"
// import Box from "next-auth/providers/box"
// import BoxyHQSAML from "next-auth/providers/boxyhq-saml"
// import Bungie from "next-auth/providers/bungie"
// import Cognito from "next-auth/providers/cognito"
// import Coinbase from "next-auth/providers/coinbase"
// import Discord from "next-auth/providers/discord"
// import Dropbox from "next-auth/providers/dropbox"
// import DuendeIDS6 from "next-auth/providers/duende-identity-server6"
// import Eveonline from "next-auth/providers/eveonline"
// import Facebook from "next-auth/providers/facebook"
// import Faceit from "next-auth/providers/faceit"
// import FortyTwoSchool from "next-auth/providers/42-school"
// import Foursquare from "next-auth/providers/foursquare"
// import Freshbooks from "next-auth/providers/freshbooks"
// import Fusionauth from "next-auth/providers/fusionauth"
// import GitHub from "next-auth/providers/github"
// import Gitlab from "next-auth/providers/gitlab"
import Google from "next-auth/providers/google"
// import Hubspot from "next-auth/providers/hubspot"
// import Instagram from "next-auth/providers/instagram"
// import Kakao from "next-auth/providers/kakao"
// import Keycloak from "next-auth/providers/keycloak"
// import Line from "next-auth/providers/line"
// import LinkedIn from "next-auth/providers/linkedin"
// import Mailchimp from "next-auth/providers/mailchimp"
// import Mailru from "next-auth/providers/mailru"
// import Medium from "next-auth/providers/medium"
// import Naver from "next-auth/providers/naver"
// import Netlify from "next-auth/providers/netlify"
// import Okta from "next-auth/providers/okta"
// import Onelogin from "next-auth/providers/onelogin"
// import Osso from "next-auth/providers/osso"
// import Osu from "next-auth/providers/osu"
// import Passage from "next-auth/providers/passage"
// import Patreon from "next-auth/providers/patreon"
// import Pinterest from "next-auth/providers/pinterest"
// import Pipedrive from "next-auth/providers/pipedrive"
// import Reddit from "next-auth/providers/reddit"
// import Salesforce from "next-auth/providers/salesforce"
// import Slack from "next-auth/providers/slack"
// import Spotify from "next-auth/providers/spotify"
// import Strava from "next-auth/providers/strava"
// import Todoist from "next-auth/providers/todoist"
// import Trakt from "next-auth/providers/trakt"
// import Twitch from "next-auth/providers/twitch"
// import Twitter from "next-auth/providers/twitter"
// import UnitedEffects from "next-auth/providers/united-effects"
// import Vk from "next-auth/providers/vk"
// import Wikimedia from "next-auth/providers/wikimedia"
// import Wordpress from "next-auth/providers/wordpress"
// import WorkOS from "next-auth/providers/workos"
// import Yandex from "next-auth/providers/yandex"
// import Zitadel from "next-auth/providers/zitadel"
// import Zoho from "next-auth/providers/zoho"
// import Zoom from "next-auth/providers/zoom"

import type { NextAuthConfig } from "next-auth"



export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    {
          id: "quickbooks",
          name: "QuickBooks",
          type: "oauth",
          clientId: process.env.QB_CLIENT_ID,
          clientSecret: process.env.QB_CLIENT_SECRET,
          authorization: {
            url: "https://appcenter.intuit.com/connect/oauth2",
            params: {
              scope: 'com.intuit.quickbooks.accounting openid email profile',
              redirect_uri: process.env.QB_REDIRECT_URI,
              // redirect_uri: 'http://localhost:3000/api/auth',
              state: 'intuit'
            },
          },
          token: "https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer",
          userinfo: "https://sandbox-quickbooks.api.intuit.com/v3/company/${realmId}/companyinfo/${realmId}",
          profile(profile: any) {
            return {
                id: profile.sub,
                name: profile.name,
                email: profile.email
                // Include any additional profile fields you need from QuickBooks
            }
        },
        },
        
        Google({
          clientId: process.env.GOOGLE_ID ?? '',
          clientSecret: process.env.GOOGLE_SECRET ?? '',
        }),
  
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    secret: process.env.NEXT_SECRET_SUPABASE_ROLE_KEY ?? '',
    
    
  }) as Adapter, 
  // pages: {
  //   // signIn: '/signin',
  //   signIn: '/connect',
  //   // signOut: '/auth/signout',
  //   error: '/connect/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check email message)
  //   newUser: '/auth/new-user' // New users will be directed here on// This is the redirect after successful Oauth 2 
  // },
  session: {
    strategy: 'database',
  },
  callbacks: {
    // async session({ session, user }) {
    //   const signingSecret = process.env.NEXT_SECRET_SUPABASE_JWT
    //   if (signingSecret) {
    //     const payload = {
    //       aud: "authenticated",
    //       exp: Math.floor(new Date(session.expires).getTime() / 1000),
    //       sub: user.id,
    //       email: user.email,
    //       role: "authenticated",
    //     }
    //     session.supabaseAccessToken = jwt.sign(payload, signingSecret)
    //   }
    //   return session
    // },

    // authorized({ request, auth }) {
    //   const { pathname } = request.nextUrl
    //   if (pathname === "api-example") return !!auth // It works no errors
    //   return true
    // },
  },
  secret
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
