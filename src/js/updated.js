/*global chrome, gsSession, gsUtils, gsViewGlobals */
(function(global) {
  'use strict';

  try {
    gsViewGlobals
      .setViewGlobals(global)
      .then(() => {
        gsUtils.documentReadyAndLocalisedAsPromised(document).then(function() {
          initUpdated();
        });
      })
      .catch(err => {
        console.error('Failed to initialize global variables:', err);
        window.setTimeout(() => window.location.reload(), 1000);
      });
  } catch (e) {
    console.error(e);
    window.setTimeout(() => window.location.reload(), 1000);
    return;
  }

  function toggleUpdated() {
    document.getElementById('updating').style.display = 'none';
    document.getElementById('updated').style.display = 'block';
  }

  function initUpdated() {
    // var versionEl = document.getElementById('updatedVersion');
    // versionEl.innerHTML = 'v' + chrome.runtime.getManifest().version;

    document.getElementById('sessionManagerLink').onclick = function(e) {
      e.preventDefault();
      chrome.tabs.create({ url: chrome.runtime.getURL('history.html') });
    };

    var updateType = gsSession.getUpdateType();
    if (updateType === 'major') {
      document.getElementById('patchMessage').style.display = 'none';
      document.getElementById('minorUpdateDetail').style.display = 'none';
    } else if (updateType === 'minor') {
      document.getElementById('patchMessage').style.display = 'none';
      document.getElementById('majorUpdateDetail').style.display = 'none';
    } else {
      document.getElementById('updateDetail').style.display = 'none';
    }

    if (gsSession.isUpdated()) {
      toggleUpdated();
    }
  }

  global.exports = {
    toggleUpdated,
  };
})(this);
