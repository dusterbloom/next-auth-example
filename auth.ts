import NextAuth from "next-auth"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import {
  Adapter,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from "@auth/core/adapters"
import jwt from "jsonwebtoken"

const secret = process.env.NEXTAUTH_SECRET ??"";


import Google from "next-auth/providers/google"

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
          checks: ["pkce", "state"],
          userinfo: "https://sandbox-accounts.intuit.com/v1/openid_connect/userinfo",
          profile(profile: any) {
            return {
              id: profile.sub,
              name: profile.name,
              email: profile.email,
              image: profile.picture,
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
  session: {
    strategy: 'database',
  },
  callbacks: {
    async session({ session, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        }
        session.supabaseAccessToken = jwt.sign(payload, signingSecret)
      }
      return session
    },
  
  },
  secret
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
