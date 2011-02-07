function copyToClipboard(url) {
  $('#url').val(url);
  $('#url').select();
  document.execCommand('copy');
}

function init() {
  chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
      if ('copy' == request.type) {
        copyToClipboard(request.url);
      } else {
        sendResponse({});
      }
    }
  );
}