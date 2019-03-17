
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCfQ8GAW7W9mnm-BNdO0_GDxTC6ggg6PD4",
    authDomain: "dag-train.firebaseapp.com",
    databaseURL: "https://dag-train.firebaseio.com",
    projectId: "dag-train",
    storageBucket: "dag-train.appspot.com",
    messagingSenderId: "882814260614"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#submit-btn").on("click", function (event) {
    event.preventDefault();
  var train = $("#train").val().trim();
  var destination = $("#destination").val().trim();
  var firsttrain = $("#first-train-time").val().trim();
  var frequency = $("#frequency").val().trim();

  var newTrain = {
      train: train,
      destination: destination,
      firsttrain: firsttrain,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP,
  };
  database.ref().push(newTrain)
  });

  database.ref().on("child_added", function (snapshot) {
    
    var ss = snapshot.val();

    var ssName = ss.name;
    var ssDestination = ss.destination;
    var ssFirstTrain = ss.firstTrain;
    var ssFrequency = ss.frequency;
    
    //I struggled to get the time conversions working. I though I was on the right track, but Im still confused. 
    
    var timeChange = moment(ssFirstTrain, "HH:mm").subtract(1, "years");
   
    var currentTime = moment();
    
    var changedTime = moment().diff(moment(timeChange), "minutes");
 

    var tRemaing = changedTime % ssFrequency;
    var minutesTillTrain = ssFrequency - tRemaing;
    var nextTrain = moment().add(minutesTillTrain, "minutes");

    //Could not get my firebase trains to show up in a new table
    var newTRow = $("<tr>");

    ("<td>" + ssName + "</td>");
    ("<td>" + ssDestination + "</td>");
    ("<td>" + ssFrequency + "</td>");
    ("<td>" + nextTrain + "</td>");

     $("#table-display").append(newTRow);
});


