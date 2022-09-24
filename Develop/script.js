//starts off the timer
setInterval(() => {
  $('#currentDay').text(moment().format('dddd, MMMM Do YYYY, h:mm:ss a'));
}, 1000);

//variables
const workHours = 8;
let textInput = [];
let currentTime = moment().format('H');

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
if (currentTime > 17) {
  $('.custom-textArea').css('background-color', 'grey');
  $('.custom-textArea').prop('disabled', true);
} else if (currentTime >= 0 && currentTime < 17) {
  let hoursPast = currentTime - 9;

  $('.custom-textArea').css('background-color', 'lightblue');
  if (hoursPast >= 0) {
    let currentHour = $('div.custom-blockContainer textarea').eq(
      currentTime - 9
    );

    for (let i = 0; i < hoursPast; i++) {
      let blockContainer = $('div.custom-blockContainer textarea').eq(i);
      blockContainer.prop('disabled', true);
      blockContainer.css('background-color', 'grey');
    }
    currentHour.prop('disabled', false);
    currentHour.css('background-color', 'orange');
  }
}
console.log(moment().format('H'));
function saveSchedule() {
  console.log('save');
}
$('.custom-saveButton').on('click', saveSchedule);
