
import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const driveService = google.drive({
  version: 'v3',
  auth,
});

export default driveService;
