// Gmail Auto-NoLabel
// Labels any emails with no label as "No Label"
// Removes "No Label" if a label is added

function autoNoLabel() {
    // ######## Settings ########

    var Label = "No Label"

    // ##### End Settings #######

    // find any emails with no label and add a label
    var batchSize = 100; // process 100 threads at once
    var threads = GmailApp.search('has:nouserlabels NOT is:chat'); // threads with no label and not a hangouts chat
    Logger.log("Account has " +threads.length+ " threads with no label");
    for (t = 0; t < threads.length; t++) { // loop though each batch of threads
        var thread = threads[t];
        var newLabel = GmailApp.getUserLabelByName(Label);
		thread.addLabel(newLabel); // apply new label
    }
    Logger.log(threads.length + " threads are now labeled " +Label);

    // find any emails that have a label but is still labeled "No Label"
    var batchSize = 100; // process 100 threads at once
    var threads = GmailApp.search('label:'+Label+' NOT is:chat'); // threads with the label "No Label" and is not a hangouts chat
    Logger.log("Processing " +threads.length+ " threads that are labeled " +Label);
    for (t = 0; t < threads.length; t++) { // loop though each batch of threads
        var thread = threads[t];
        var threadlabels = thread.getLabels();
        for (var l = 0; l < threadlabels.length; l++) {
            var labelName = threadlabels[l].getName();
            if (labelName != Label){ // does label not match "No Label"
                var newLabel = GmailApp.getUserLabelByName(Label);
                thread.removeLabel(newLabel); // apply new label
            }
        }
    }
    Logger.log(threads.length + " threads are no longer labeled " +Label);
}