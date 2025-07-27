import passport from 'passport';
import {
  Strategy as GoogleStrategy,
  Profile as GoogleProfile,
} from 'passport-google-oauth20';
import {
  Strategy as FacebookStrategy,
  Profile as FacebookProfile,
} from 'passport-facebook';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_REDIRECT_URI!,
    },
    (accessToken, refreshToken, profile: GoogleProfile, done) => {
      // Create a user object containing profile and tokens
      const user = {
        ...profile,
        accessToken,
        refreshToken,
      };
      return done(null, user);
    },
  ),
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      callbackURL: process.env.FACEBOOK_REDIRECT_URI!,
      profileFields: ['id', 'displayName', 'emails'],
    },
    (accessToken, refreshToken, profile: FacebookProfile, done) => {
      const user = {
        ...profile,
        accessToken,
        refreshToken,
      };
      return done(null, user);
    },
  ),
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj: Express.User | null, done) => done(null, obj));

export default passport;
