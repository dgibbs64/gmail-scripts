// Gmail Auto-NoLabel
// Labels any emails with no label as "No Label".
// Removes "No Label" if a label is added.
// https://github.com/dgibbs64/gmail-scripts

function autoNoLabel() {
    // ######## Settings ########
  
    var Label = "No Label"
    
    // ##### End Settings #######
    
  // find any emails with no label and add a label
  var max = 100;
  var offset = 0;
  var searchThreads = [];
  while (true) {
    var threads = GmailApp.search('has:nouserlabels NOT is:chat', offset, max);
    searchThreads = searchThreads.concat(threads);
    for (var t=0; t < threads.length; t++) {
      var thread = threads[t];
      var threadLabels = threads[t].getLabels();
      var threadLabelsCount = threadLabels.length;
      for (var l = 0; l < threadLabelsCount; l++) {
        var labelName = threadLabels[l].getName();
        if (labelName != Label){ // does label not match "No Label"
            var newLabel = GmailApp.getUserLabelByName(Label);
            Logger.log("Found email with no label: applying the " +Label+ " label");
            thread.addLabel(newLabel); // apply new label
        }
      } 
    }
    if (threads.length < max) {
      break;
    }
  
    offset += max;
  }
    Logger.log("Found " +searchThreads.length+ " emails with no label ");  // Output total threads 

    // find any emails that have a label but is still labeled "No Label"
    var max = 100;
    var offset = 0;
    var searchThreads = [];
    while (true) {
      var threads = GmailApp.search('label:No Label NOT is:chat', offset, max);
      searchThreads = searchThreads.concat(threads);
      for (var t=0; t < threads.length; t++) {
        var thread = threads[t];
        var threadLabels = threads[t].getLabels();
        var threadLabelsCount = threadLabels.length;
        for (var l = 0; l < threadLabelsCount; l++) {
          var labelName = threadLabels[l].getName();
          if (labelName != Label){ // does label not match "No Label"
              var newLabel = GmailApp.getUserLabelByName(Label);
              Logger.log("Found email with label: removing " +Label+ " label");
              thread.removeLabel(newLabel); // apply new label
          }
        } 
      }
      if (threads.length < max) {
        break;
      }
    
      offset += max;
    }
      Logger.log("Checked " +searchThreads.length+ " emails with the label " +Label);  // Output total threads
}
