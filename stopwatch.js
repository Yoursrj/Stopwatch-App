$(function () {
  var mode = 0; //app mode
  var timecounter = 0; //main big time counter
  var lapcounter = 0; // counter for lap 
  var action; // variable for set interval 
  var lapnumber = 0;// number of laps
  //minutes,seconds,centiseconds for timecounter and lapcounter
  var timeminutes, timeseconds, timecentiseconds, lapminutes, lapseconds, lapcentiseconds;

  //on app load , show startbutton and lapbutton
  hideshowButtons("#startButton", "#lapButton");
  //click on startbutton
  $("#startButton").click(function () {
    //mode on
    mode = 1;
    //show stop and lap buttons
    hideshowButtons("#stopButton", "#lapButton");
    //start counter
    startAction();
  });

  //click on stopButton
  $("#stopButton").click(function () {
    //show resume and reset buttons
    hideshowButtons("#resumeButton", "#resetButton");
    //stop counter
    clearInterval(action);
  });

  //click on resumeButton
  $("#resumeButton").click(function () {
    //show stop and lap buttons
    hideshowButtons("#stopButton", "#lapButton");
    //start counter
    startAction();
  });

  //click on resetButton
  $("#resetButton").click(function () {
    //reload the page
    location.reload();
  });

  $("#lapButton").click(function () {
    //if mode is ON
    if (mode = 1) {
      //stop action
      clearInterval(action);
      //resetLap and print lap details
      lapcounter = 0;
      addlaps();
      //start action
      startAction();
    }
  });

  //functions


  function hideshowButtons(x, y) {
    $(".control").hide();
    $(x).show();
    $(y).show();
  }


  //start the counter
  function startAction() {
    action = setInterval(function () {
      timecounter++;
      lapcounter++;
      updateTime();
    }, 10);// a second will go up by 1 every milisecond ,, a centisecond will go up by 10 milseconds
  }
  //updateTime converts counters to ,min , sec and centisec
  function updateTime() {
    //1min = 60s*100centiseconds = 600centiseconds
    timeminutes = Math.floor(timecounter / 6000);
    //1sec=100centiseconds
    timeseconds = Math.floor((timecounter % 6000) / 100);
    timecentiseconds = (timecounter % 6000) % 100;
    $("#timeminute").text(format(timeminutes));
    $("#timesecond").text(format(timeseconds));

    $("#timecentsecond").text(format(timecentiseconds));

    //1min=60*100centiseconds=6000centiseconds
    lapminutes = Math.floor(lapcounter / 6000);
    //1sec=100centiseconds
    lapseconds = Math.floor((lapcounter % 6000) / 100);
    lapcentiseconds = (lapcounter % 6000) % 100;
    $("#lapminute").text(format(lapminutes));
    $("#lapsecond").text(format(lapseconds));

    $("#lapcentsecond").text(format(lapcentiseconds));

  }

  function format(number) {
    if (number < 10) {
      return '0' + number;
    } else {
      return number;
    }
  }

  function addlaps() {
    lapnumber++;
    var mylapdetails = '<div class="lap">' + '<div class="laptimetitle">' + 'lap' + lapnumber + '</div>' + '<div class="laptime">' + '<span>' + format(lapminutes) + '</span>' +
      ':<span>' + format(lapseconds) + '</span>' + ':<span>' + format(lapcentiseconds) + '</span>' + '</div>' +
      '</div>';
    $(mylapdetails).appendTo("#laps");

  }
});