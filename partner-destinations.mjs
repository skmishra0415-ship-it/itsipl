// Verified from ITSIPL navigation and content on 2026-10-05.
// Evidence: verification/partner-live-audit.json. Preserve local fallback pages.
export const partnerDestinations = Object.freeze({
  "sophos": {
    "url": "https://www.itsipl.com/sophos-partner-in-delhi-chandigarh-jaipur-mumbai/",
    "localUrl": "partner-sophos.html",
    "status": "verified"
  },
  "palo-alto-networks": {
    "url": "https://www.itsipl.com/palo-alto-partner-in-delhi-chandigarh-jaipur-mumbai/",
    "localUrl": "partner-palo-alto-networks.html",
    "status": "verified"
  },
  "crowdstrike": {
    "url": "https://www.itsipl.com/crowdstrike-partner-in-delhi-chandigarh-jaipur-mumbai/",
    "localUrl": "partner-crowdstrike.html",
    "status": "verified"
  },
  "manageengine": {
    "url": "https://www.itsipl.com/manageengine-partner-in-delhi-chandigarh-jaipur-mumbai/",
    "localUrl": "partner-manageengine.html",
    "status": "verified"
  },
  "commvault": {
    "url": "https://www.itsipl.com/commvault-partner-in-delhi-chandigarh-jaipur-mumbai/",
    "localUrl": "partner-commvault.html",
    "status": "verified"
  },
  "druva": {
    "url": "https://www.itsipl.com/druva-partner-in-delhi-chandigarh-jaipur-mumbai/",
    "localUrl": "partner-druva.html",
    "status": "verified"
  },
  "netskope": {
    "url": "https://www.itsipl.com/netskope-partner-in-delhi-chandigarh-jaipur-mumbai/",
    "localUrl": "partner-netskope.html",
    "status": "verified"
  },
  "forcepoint": {
    "url": "https://www.itsipl.com/forcepoint-partner-in-delhi-chandigarh-jaipur-mumbai/",
    "localUrl": "partner-forcepoint.html",
    "status": "verified"
  }
});
export function partnerDestination(id) {
 const d=partnerDestinations[id];
 if(!d) throw new Error('Unknown partner destination: '+id);
 return d.status==='verified'?d.url:d.localUrl;
}
export function partnerLinkAttributes(id) {
 const url=partnerDestination(id);
 return 'href="'+url+'"'+(url.startsWith('https://')?' target="_blank" rel="noopener noreferrer"':'');
}
export function partnerNewTabText(id) {
 return partnerDestination(id).startsWith('https://')?'<span class="sr-only"> (opens itsipl.com in a new tab)</span>':'';
}
