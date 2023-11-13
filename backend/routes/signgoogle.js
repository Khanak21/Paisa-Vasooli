import express from "express";
import passport from "passport";
const router = express.Router();
import { OAuth2Client } from "google-auth-library"; 
// import passportStrategy from './Passport.js';
// const passportStrategy = require("./Passport.js")
router.post('/oauth', async function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Referrer-Policy","no-referrer-when-downgrade");
    const redirectURL = 'http://localhost:3001/api/oauth';
  
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
        redirectURL
      );
  
      // Generate the url that will be used for the consent dialog.
      const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile  openid ',
        prompt: 'consent'
      });
  
      res.json({url:authorizeUrl})
  
  });

export default router;