/*global chrome, gsUtils, gsViewGlobals */
(function(global) {
  'use strict';

  try {
    gsViewGlobals
      .setViewGlobals(global)
      .then(() => {
        gsUtils.documentReadyAndLocalisedAsPromised(document).then(function() {
          //do nothing
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
