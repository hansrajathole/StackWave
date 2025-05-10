import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.model.js';
import config from '../config/config.js';

const configurePassport = () => {
  passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user exists
      let user = await User.findOne({ _id: profile.id });
      
      if (!user) {
        // Create new user if doesn't exist
        user = await User.create({
          _id: profile.id,
          username: profile.displayName,
          email: profile.emails?.[0].value || '',
          avatar: profile.photos?.[0].value || '',
          isVerified : true,
        });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
};

export default configurePassport;