import nodemailer from "nodemailer";
import { google } from "googleapis";
import path from "path";
import ejs from "ejs";

const GOOGLE_ID =
    "350112565242-4qn4bpqq2k9cts6mqs7ig1r55c38q83r.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_REFRESHTOKEN =
    "1//04qqJUlI9iAtWCgYIARAAGAQSNwF-L9IrmX1rqA0KFMphKTzV60NxqDifoc7kkPiZ7QTWmkbKN10Fb9fXFvCcvvnd3q-Ro2uHx_4";

const GOOGLE_URL = "https://developer.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL);
oAuth.setCredentials({ access_token: GOOGLE_REFRESHTOKEN });

const URL: string = "http://localhost:3344";

export const openingMail = async (user: any) => {
    try {
        const accessToken: any = (await oAuth.getAccessToken()).token;

        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "udidagodswill7@gmail.com",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: GOOGLE_REFRESHTOKEN,
                accessToken,
            },
        });

        const data = {
            email: user.email,
            userName: user.userName,
            url: `${URL}/api/${user.id}/verified`,
        };

        const locateFile = path.join(__dirname, "../views/accountOpening.ejs");
        const readFile = await ejs.renderFile(locateFile, data);

        const mailer = {
            from: "Account Opening 🚀🚀🚀 <udidagodswill7@gmail.com>",
            to: user?.email,
            subject: "Account Opening",
            html: readFile,
        };

        transport.sendMail(mailer);
    } catch (error) {
        console.log(error);
    }
};
