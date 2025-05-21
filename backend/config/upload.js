// // upload.js
// import fs from 'fs';
// import path from 'path';
// import driveService from './driveConfig.js';

// async function uploadToDrive(filePath, fileName, folderId = null) {
//   const fileMetadata = {
//     name: fileName,
//     parents: folderId ? [folderId] : [],
//   };

//   const media = {
//     mimeType: 'image/jpeg',
//     body: fs.createReadStream(filePath),
//   };

//   const response = await driveService.files.create({
//     resource: fileMetadata,
//     media: media,
//     fields: 'id, webViewLink',
//   });

//   return response.data;
// }

// export default uploadToDrive;


// // upload.js
// import fs from 'fs';
// import path from 'path';
// import driveService from './driveConfig.js';

// // Upload file to Google Drive
// async function uploadToDrive(filePath, fileName, folderId = null) {
//   const fileMetadata = {
//     name: fileName,
//     parents: folderId ? [folderId] : [],
//   };

//   const media = {
//     mimeType: 'image/jpeg',
//     body: fs.createReadStream(filePath),
//   };

//   // 1. Upload the file
//   const uploadResponse = await driveService.files.create({
//     resource: fileMetadata,
//     media: media,
//     fields: 'id',
//   });

//   const fileId = uploadResponse.data.id;

//   // 2. Set permission to public
//   await driveService.permissions.create({
//     fileId: fileId,
//     requestBody: {
//       role: 'reader',
//       type: 'anyone',
//     },
//   });

//   // 3. Get the public link
//   const file = await driveService.files.get({
//     fileId: fileId,
//     fields: 'webViewLink, webContentLink',
//   });

//   return {
//     id: fileId,
//     webViewLink: file.data.webViewLink,
//     webContentLink: file.data.webContentLink,
//   };
// }

// export default uploadToDrive;


import driveService from './driveConfig.js';
import { Readable } from 'stream'; 

async function uploadToDrive(buffer, fileName, mimeType, folderId = null) {//filePath->buffer
  const fileMetadata = {
    name: fileName,
    parents: folderId ? [folderId] : [],
  };

  const media = {
    mimeType: mimeType,
    // body: fs.createReadStream(filePath),
    body: Readable.from(buffer), 
  };

  // 1. Upload file
  const uploadResponse = await driveService.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id',
  });

  const fileId = uploadResponse.data.id;

  // 2. Make the file public
  await driveService.permissions.create({
    fileId: fileId,
    requestBody: {
      role: 'reader',
      type: 'anyone',
    },
  });

  // 3. Get the view link (NOT download link)
  const file = await driveService.files.get({
    fileId: fileId,
    fields: 'webViewLink',
  });

  return {
    id: fileId,
    webViewLink: file.data.webViewLink,
  };
}

export default uploadToDrive;
