function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Tech For Girls Registration')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function uploadFile(base64Data, fileName) {
  const folder = DriveApp.getFolderById('1Gi8oe_trVzHxGLfEmQHz8b7RabDDFJ-U');
  const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), 'image/jpeg', fileName);
  const file = folder.createFile(blob);
  return `https://drive.google.com/uc?export=view&id=${file.getId()}`;
}

function submitForm(formData) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Form Responses');
  const rowIndex = sheet.getLastRow() + 1;
  sheet.appendRow([
    formData.name,
    formData.mobileno,
    formData.email,
    formData.college,
    formData.gender,
    '' // Placeholder for image
  ]);
  const imageCell = sheet.getRange(rowIndex, 6);
  imageCell.setFormula(`=IMAGE("${formData.imageUrl}", 4, 200, 200)`);
  return true;
}
