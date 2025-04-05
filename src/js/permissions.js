/*global chrome, historyUtils, gsSession, gsChrome, gsUtils, gsViewGlobals */
(function(global) {
  'use strict';

  try {
    gsViewGlobals
      .setViewGlobals(global)
      .then(() => {
        gsUtils.documentReadyAndLocalisedAsPromised(document).then(function() {
          document.getElementById('exportBackupBtn').onclick = async function(
            e
          ) {
            const currentSession = await gsSession.buildCurrentSession();
            historyUtils.exportSession(currentSession, function() {
              document.getElementById('exportBackupBtn').style.display = 'none';
            });
          };
          document.getElementById(
            'setFilePermissiosnBtn'
          ).onclick = async function(e) {
            await gsChrome.tabsCreate({
              url: 'chrome://extensions?id=' + chrome.runtime.id,
            });
          };
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
})(this);
