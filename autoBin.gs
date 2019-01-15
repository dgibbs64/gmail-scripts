// Gmail Auto-Bin
// autoBin- Move emails with specific label and older than X days to trash.
// https://github.com/dgibbs64/gmail-scripts

function autoBin() {
    // ######## Settings ########

        var Days = 180
        var Label = "Auto Bin"

    // ##### End Settings #######

    var batchSize = 100; // process up to 100 threads at once
    var threads = GmailApp.search('label:'+Label+' older_than:'+Days+'d'); // find threads in label older than X days
    for (t = 0; t < threads.length; t+=batchSize) { // loop though each batch of threads
        GmailApp.moveThreadsToTrash(threads.slice(t, t+batchSize)); // move thread to trash
    }
    Logger.log(threads.length + " threads moved to trash from " +Label);
}
