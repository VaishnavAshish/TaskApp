const {google} = require('googleapis');
let auth;
const googleConfig = {
  clientId: process.env.OAUTH2_CLIENT_ID,
  clientSecret: process.env.OAUTH2_CLIENT_SECRET,
  redirect: process.env.OAUTH2_CALLBACK
};

createConnection = () => {
    return new google.auth.OAuth2(
      '791475632859-1fi5r0fdasqhnsora68rgs1q7u51gg3t.apps.googleusercontent.com',
      'ss47ngZqm7DK_ylEyFBGYZr6',
      'http://localhost:3000/authGoogleSignIn'
    );
  }



const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
  ];

  /**
 * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
 */
getConnectionUrl = (auth) => {
    return auth.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
      scope: defaultScope
    });
  }

  getGooglePlusApi = (auth) => {
    return google.plus({ version: 'v1', auth });
  }
  /* Create the google url to be sent to the client. */
exports.urlGoogle = () => {
    auth = createConnection();
    const url = getConnectionUrl(auth);
    return url;
  }


  /*part 2: Take the "code" parameter which Google gives us once when the user logs in, then get the user's email and id.
 */
exports.getGoogleAccountFromCode = async (code) => {
    try{
        //const auth = createConnection();
    console.log('---------auth--')
    console.log(auth);
    console.log('---------code--')
    console.log(code)
    const data = await auth.getToken(code);
    const tokens = data.tokens;
    console.log('-----tokens------');
    console.log(tokens)
    auth.setCredentials(tokens);
    const plus = getGooglePlusApi(auth);
    const me = await plus.people.get({ userId: 'me' });
    console.log('|||||||||||||||||||||||');
    console.log(me.data);
    const userGoogleId = me.data.id;
    const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
    return {
      id: userGoogleId,
      email: userGoogleEmail,
      tokens: tokens,
    };
    }catch(e){
        console.log('e$$$$$$$$$$$$$$$$$$$$$$.message');
        console.log(e.message);
    }
}