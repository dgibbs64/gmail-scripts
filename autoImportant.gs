// Gmail Auto-Important
// 1. autoUnimportant - Makes emails with a label unimportant
// 2. autoImportant - Makes emails with a label important
// https://github.com/dgibbs64/gmail-scripts

// Makes emails with a label Unimportant
function autoUnImportant() {
    // ######## Settings ########

        var Label = "Auto Bin"

    // ##### End Settings #######

    var batchSize = 100; // process up to 100 threads at once
    var threads = GmailApp.search('label:'+Label+''); // find threads with label and older than X days
    for (t = 0; t < threads.length; t+=batchSize) { // loop though each batch of threads
         threads[t].markUnimportant(); // Mark Unimportant
    }
    Logger.log(threads.length + " threads with label " +Label+ " marked Unimportant" );
}

// Makes emails with a label important
function autoImportant() {
    // ######## Settings ########

        var Label = "LABEL"

    // ##### End Settings #######

    var batchSize = 100; // process up to 100 threads at once
    var threads = GmailApp.search('label:'+Label+''); // find threads with label and older than X days
    for (t = 0; t < threads.length; t+=batchSize) { // loop though each batch of threads
         threads[t].markImportant(); // Mark Important
    }
    Logger.log(threads.length + " threads with label " +Label+ " marked Important" );
}
