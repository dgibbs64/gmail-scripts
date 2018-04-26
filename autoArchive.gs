// Gmail Auto-Archive
// Archives emails older than X days from inbox.
// Recommend running once a day.
// https://github.com/dgibbs64/gmail-scripts

// Unread emails older than Days in inbox are archived.
function autoArchiveDays() {
    // ######## Settings ########

        var Days = 7

    // ##### End Settings #######

    var batchSize = 100; // process 100 threads at once
    var threads = GmailApp.search('label:inbox is:unread older_than:'+Days+'d'); // find threads in inbox older than X days
    for (t = 0; t < threads.length; t+=batchSize) { // loop though each batch of threads
        GmailApp.moveThreadsToArchive(threads.slice(t, t+batchSize)); // move thread to archive
    }
    Logger.log(threads.length + " unread threads older than " +Days+ " days moved to archive from Inbox");
}

// Read emails in inbox are archived.
function autoArchiveRead() {
    var batchSize = 100; // process up to 100 threads at once
    var threads = GmailApp.search('label:read label:inbox'); // find threads in inbox
    for (t = 0; t < threads.length; t+=batchSize) { // loop though each batch of threads
        GmailApp.moveThreadsToArchive(threads.slice(t, t+batchSize)); // move thread to archive
    }
    Logger.log(threads.length + " read threads moved to archive from Inbox");
}