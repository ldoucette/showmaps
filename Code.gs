function doGet() {
  var output = null;
  var info = getData();  // function call to get data

  // output in json
  output = ContentService.createTextOutput(JSON.stringify(info))
           .setMimeType(ContentService.MimeType.JSON);

  return output;
}

function getData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');  // change this to sheet name

  // read data from sheet
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  var range = sheet.getRange(1, 1, lastRow, lastCol);
  var values = range.getValues();
  var data = [];

  values.forEach(function(value) {
    var row = {};
    row.name = value[0];
    row.address = getLongLat(value[1]);
    data.push(row);
  })

  return data;

}

/*
Compute long lat
@param: address in string
@return:  object type with address and computed long lat
*/
function getLongLat(address) {
  var response = Maps.newGeocoder().geocode(address);
  for (var i = 0; i < response.results.length; i++) {
    var addressData={};
    var result = response.results[i];
    addressData.address = result.formatted_address;
    addressData.lat = result.geometry.location.lat;
    addressData.lng = result.geometry.location.lng;
  }
  return addressData;
}
