// Gmail Auto-NoLabel
// Labels any emails with no label as "No Label".
// Removes "No Label" if a label is added.
// https://github.com/dgibbs64/gmail-scripts

function autoNoLabel() {
    // ######## Settings ########
  
    var Label = "No Label"
    
    // ##### End Settings #######

    var batchSize = 100; // process up to 100 threads at once
  var threads = GmailApp.search('has:nouserlabels NOT is:chat'); // find threads in inbox
  for (t = 0; t < threads.length; t+=batchSize) { // loop though each batch of threads
    Logger.log("Found email with no label: applying the " +Label+ " label");
    var threadLabel = GmailApp.getUserLabelByName(Label);
    threads[t].addLabel(threadLabel); // apply new label
  }
    
 
//find any emails that have a label but is still labeled "No Label"
  
  var batchSize = 100; // process up to 100 threads at once
  var threads = GmailApp.search('label:No Label NOT is:chat'); // find threads in inbox  
  for (t = 0; t < threads.length; t+=batchSize) { // loop though each batch of threads
    Logger.log("Found email with label: removing " +Label+ " label");
    var threadLabel = GmailApp.getUserLabelByName(Label);
    var newLabel = GmailApp.getUserLabelByName(Label);
    threads[t].removeLabel(newLabel); // remove label
    var newLabel = GmailApp.getUserLabelByName(Label);
  }
}