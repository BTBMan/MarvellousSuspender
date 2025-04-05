/*global chrome, tgs, gsStorage, gsUtils, gsViewGlobals */
(function(global) {
  'use strict';

  try {
    gsViewGlobals
      .setViewGlobals(global)
      .then(() => {
        gsUtils.documentReadyAndLocalisedAsPromised(document).then(function() {
          var notice = tgs.requestNotice();
          if (
            notice &&
            notice.hasOwnProperty('text') &&
            notice.hasOwnProperty('version')
          ) {
            var noticeContentEl = document.getElementById('gsNotice');
            noticeContentEl.innerHTML = notice.text;
            //update local notice version
            gsStorage.setNoticeVersion(notice.version);
          }

          //clear notice (to prevent it showing again)
          tgs.clearNotice();
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
