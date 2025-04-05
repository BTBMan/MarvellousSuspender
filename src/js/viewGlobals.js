/**
 * 视图全局变量设置工具 - Manifest V3 兼容版本
 * 替代原先使用 chrome.extension.getBackgroundPage().tgs.setViewGlobals(global) 的方法
 */

(function() {
  'use strict';

  /**
   * 通过消息传递获取扩展全局变量并设置到当前窗口
   * @param {Window} _window - 要设置全局变量的窗口对象
   * @returns {Promise} - 在全局变量设置完成后解析的 Promise
   */
  function setViewGlobals(_window) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(
        { action: 'getExtensionGlobals' },
        response => {
          if (chrome.runtime.lastError) {
            console.error(
              'Get extension globals failed:',
              chrome.runtime.lastError
            );
            reject(new Error('Get extension globals failed'));
            return;
          }

          if (!response || !response.globals) {
            reject(new Error('Extension library not ready'));
            return;
          }

          // 将全局变量应用到当前窗口
          Object.assign(_window, response.globals);
          resolve();
        }
      );
    });
  }

  /**
   * 等待背景脚本就绪
   * @param {number} retries - 重试次数
   * @returns {Promise} - 在背景脚本就绪后解析的 Promise
   */
  function backgroundScriptsReadyAsPromised(retries) {
    retries = retries || 0;
    if (retries > 300) {
      // 允许等待 30 秒
      chrome.tabs.create({ url: chrome.runtime.getURL('broken.html') });
      return Promise.reject('Failed to initialize background scripts');
    }

    return new Promise(function(resolve) {
      chrome.runtime.sendMessage({ action: 'isReady' }, function(response) {
        resolve(response && response.isReady);
      });
    }).then(function(isReady) {
      if (isReady) {
        return Promise.resolve();
      }
      return new Promise(function(resolve) {
        setTimeout(resolve, 100);
      }).then(function() {
        retries += 1;
        return backgroundScriptsReadyAsPromised(retries);
      });
    });
  }

  // 暴露公共方法
  window.gsViewGlobals = {
    setViewGlobals,
    backgroundScriptsReadyAsPromised,
  };
})();
