$(document).ready(function () {
  var firstTime = true;
  var initiate = true;
  var startTime;
  var endTime;

  $("#btn").on("click", function () {
    if (firstTime) {
      startTime = new Date();
      firstTime = false;
    } else {
      initiate = false;
      endTime = new Date();
      firstTime = true;
    }
    if (!initiate) {
      endTime > startTime ? $("#display").text(`Last time you clicked was ${endTime - startTime} ms ago`) : $("#display").text(`Last time you clicked was ${startTime - endTime} ms ago`);
    }
  });
});
