/* global chrome, XMLHttpRequest, gsUtils, gsStorage, gsViewGlobals */
(function(global) {
  'use strict';

  try {
    gsViewGlobals
      .setViewGlobals(global)
      .then(() => {
        gsUtils.documentReadyAndLocalisedAsPromised(document).then(function() {
          //Set theme
          document.body.classList.add(
            gsStorage.getOption(gsStorage.THEME) === 'dark' ? 'dark' : null
          );

          var versionEl = document.getElementById('aboutVersion');
          versionEl.innerHTML = 'v' + chrome.runtime.getManifest().version;

          //hide incompatible sidebar items if in incognito mode
          if (chrome.extension.inIncognitoContext) {
            Array.prototype.forEach.call(
              document.getElementsByClassName('noIncognito'),
              function(el) {
                el.style.display = 'none';
              }
            );
          }
        });
      })
      .catch(err => {
        console.error('Failed to initialize global variables:', err);
        window.setTimeout(() => window.location.reload(), 1000);
      });
  } catch (e) {
    console.error(e);
    window.setTimeout(() => window.location.reload(), 1000);
  }
})(this);
