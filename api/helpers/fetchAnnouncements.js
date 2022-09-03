const fetch = require('node-fetch');

async function fetchAnnouncements(announcements) {
    const promises = [];

    for(let i=0; i< announcements.length; i++) {
        if(!announcements[i]) {
            continue;
        }
        const promise = fetch('https://arweave.net/'+announcements[i]).then(response => response.json());
        promises.push(promise);
    }

    return Promise.all(promises);
}

module.exports = fetchAnnouncements;