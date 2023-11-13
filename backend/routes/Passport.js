import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from "passport";

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: process.env.CALLBACK_URL,
			scope: ["profile", "email"],
			passReqToCallback:true
		},
		function (request,accessToken, refreshToken, profile, done) {
			console.log(profile)
			return done(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});