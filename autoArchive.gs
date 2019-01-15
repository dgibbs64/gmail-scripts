// Gmail Auto-Archive
// 1. Archives emails older than X days from inbox.
// 2. Archives email that have been read.
// Recommend running once a day.
// https://github.com/dgibbs64/gmail-scripts

// Archives emails older than X days from inbox.
function autoArchiveDays() {
    // ######## Settings ########

        var Days = 7

    // ##### End Settings #######

    var batchSize = 100; // process 100 threads at once
    var threads = GmailApp.search('label:inbox is:unread older_than:'+Days+'d'); // find threads in inbox older than X days
    for (t = 0; t < threads.length; t+=batchSize) { // loop though each batch of threads
        GmailApp.moveThreadsToArchive(threads.slice(t, t+batchSize)); // move thread to archive
    }
    Logger.log(threads.length + " threads older than " +Days+ " days have been moved to archive");
}

// Archives email that have been read
function autoArchiveRead() {
    var batchSize = 100; // process up to 100 threads at once
    var threads = GmailApp.search('label:read label:inbox'); // find threads in inbox
    for (t = 0; t < threads.length; t+=batchSize) { // loop though each batch of threads
        GmailApp.moveThreadsToArchive(threads.slice(t, t+batchSize)); // move thread to archive
    }
    Logger.log(threads.length + " read threads have been moved to archive");
}
