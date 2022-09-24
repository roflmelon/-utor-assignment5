//starts off the timer
setInterval(() => {
  $('#currentDay').text(moment().format('dddd, MMMM Do YYYY, h:mm:ss a'));
}, 1000);

//variables
const workHours = 8;

// get all the necessary elements and populate all the rows
for (let i = 0; i <= workHours; i++) {
  let mainContainer = $('.container');
  let blockContainer = $('<div>');
  let dateArea = $('<div>');
  let textArea = $('<textarea>');
  let saveButton = $('<button>');

  blockContainer.append(dateArea);
  blockContainer.append(textArea);
  blockContainer.append(saveButton);

  mainContainer.append(blockContainer);
  if (i + 9 < 12) {
    dateArea.text(i + 9 + ':00 AM');
  } else if (i + 9 == 12) {
    dateArea.text(i + 9 + ':00 PM');
  } else {
    dateArea.text(i + 9 - 12 + ':00 PM');
  }
  saveButton.addClass('far fa-save bg-primary rounded-right rounded-lg');
  blockContainer.addClass('row border custom-blockContainer');
  dateArea.addClass('col-2 text-center custom-dateArea');
  textArea.addClass('col-8 custom-textArea');
  saveButton.addClass('col-2 custom-saveButton');
}
if (moment().format('H') > 17) {
  $('.custom-textArea').css('background-color', 'grey');
  $('.custom-textArea').prop('disabled', true);
} else if (moment().format('H') >= 0 && moment().format('H') < 17) {
  let hoursLeft = 17 - moment().format('H');
  if (hoursLeft) {
    $('.custom-textArea').css('background-color', 'lightblue');
  }
  let listOfHours = $('div.custom-blockContainer div');
}
