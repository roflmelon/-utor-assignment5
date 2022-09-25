//starts off the timer
setInterval(() => {
  $('#currentDay').text(moment().format('dddd, MMMM Do YYYY, h:mm:ss a'));
}, 1000);

//variables
const workHours = 8;
let currentTime = 9;
// let currentTime = moment().format('H');

//selectors

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
  saveButton.addClass(
    'far fa-save bg-primary rounded-right rounded-lg col-2 saveButton'
  );
  saveButton.attr('data-index', i);
  blockContainer.addClass('row border custom-blockContainer');
  dateArea.addClass('col-2 text-center custom-dateArea');
  textArea.addClass('col-8 custom-textArea');
}
if (currentTime >= 18) {
  $('.custom-textArea').css('background-color', 'grey');
  $('.custom-textArea').prop('disabled', true);
} else if (currentTime >= 0 && currentTime < 18) {
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

function renderSchedule() {
  let workSchedule = JSON.parse(localStorage.getItem('schedules'));
  let textInput = $('div.custom-blockContainer textarea');
  for (let i = 0; i < workSchedule.length; i++) {
    let workTime = workSchedule[i].time;
    console.log(textInput.eq(workTime).value);
    textInput.eq(workTime).val(workSchedule[i].text);
  }
}
function saveSchedule(event) {
  let workSchedule = JSON.parse(localStorage.getItem('schedules'));
  let saveBtnIndex = event.target.getAttribute('data-index');
  let textInput = $('div.custom-blockContainer textarea');
  let text = textInput.eq(saveBtnIndex).val().trim();
  let scheduleIndex = workSchedule.findIndex((element) => {
    return element.time === saveBtnIndex;
  });

  console.log(scheduleIndex);
  if (text !== '') {
    if (workSchedule === null || workSchedule === undefined) {
      let input = { time: saveBtnIndex, text: text };
      let schedules = [];
      schedules.push(input);
      localStorage.setItem('schedules', JSON.stringify(schedules));
    } else if (scheduleIndex !== -1) {
      workSchedule[scheduleIndex].text = text;
      localStorage.setItem('schedules', JSON.stringify(workSchedule));
    } else if (scheduleIndex === -1) {
      let workSchedule = JSON.parse(localStorage.getItem('schedules'));
      let input = { time: saveBtnIndex, text: text };
      workSchedule.push(input);
      localStorage.setItem('schedules', JSON.stringify(workSchedule));
    }
  }
}

$('.saveButton').on('click', saveSchedule);
addEventListener('load', renderSchedule);
