// Gmail Auto-Label
// Applies a new label to emails with an existing label.

function autoLabel() {
    // ######## Settings ########

    var existingLabel = [
      "notifications-server",
      "notifications-brief",
      "notifications-github",
      "notifications-security"
    ];

    var newLabel = "Auto Bin"

    // ##### End Settings #######

    for (l = 0; l < existingLabel.length; l++){ // loop though each label
        Logger.log("Label: " +existingLabel[l] );
        var batchSize = 100; // process 100 threads at once
        var threads = GmailApp.search('label:'+existingLabel[l]+''); // find threads with current label
        var threadLabel = GmailApp.getUserLabelByName(newLabel);
        for (t = 0; t < threads.length; t++) { // loop though each batch of threads
            threads[t].addLabel(threadLabel); // apply new label
        }
        Logger.log(threads.length+ " threads added to " +newLabel);
    }
}