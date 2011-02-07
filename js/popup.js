var tabTitle = false;
var tabSelection = false;

// get the current tab's URI
chrome.tabs.getSelected(null, function(tab) {
  tablink = tab.url;
  tabTitle = tab.title;
  tabSelection = false;

  chrome.tabs.sendRequest(
    tab.id,
    { method: 'getSelection' },
    function(response) { tabSelection = response.data; }
  );

  shorten(tab.url);
});

showResult = function() {
  var short_url = req.responseText;

  if (200 == req.status) {
    var preferences = getPreferences();
    $('.error').attr('display', 'none');

    $('#shorturl').attr('href', short_url).html(short_url);
    $('#view-details').attr('href', short_url + '/');

    if (preferences.auto_copy) {
      chrome.extension.sendRequest({type: "copy", url: short_url});
    } else {
      $("#manual-copy").show();
      $("#copy").click(function (ev) {
        ev.preventDefault();
        chrome.extension.sendRequest({type: "copy", url: short_url});
        $("#copy").html('Copied!');
      });
    }

    var encoded_url = encodeURIComponent(short_url);
    $('#twitter').attr('href', 'http://twitter.com/?status=' + encoded_url);
    $('#delicious').attr('href', 'http://www.delicious.com/save?v=5&noui&jump=close&url=' + encoded_url);
    $('#blogmarks').attr('href', 'http://blogmarks.net/my/new.php?mini=1&simple=1&url=' + tablink);

    $('#view-details, #twitter, #delicious').click(function(event) {
      chrome.tabs.create({
        selected: true,
        url:      event.srcElement.href
      });
      return false;
    });

    // blogmarks click handler
    $('#blogmarks').click(function(event) {
      var url = event.srcElement.href;

      if (tabTitle) {
        url = url + '&title=' + encodeURIComponent(tabTitle);
      }

      if (tabSelection) {
        url = url + '&summary=' + tabSelection;
      }

      chrome.windows.create({
        type:     'popup',
        width:    425,
        height:   470,
        url:      url
      });
      return false;
    });

    $('.success').attr('display', 'block').attr('height', 'auto');
  } else {
    $('.success').remove();
    $('body').attr('height', '50px');
    $('.error').html(url);
    $('.error').attr('border', '1px white solid');
  }
};

function shorten(tablink) {
  req = new XMLHttpRequest();
  var url = "http://api.xav.cc/simple/encode?url=" + encodeURIComponent(tablink);
  req.open("GET", url, true);
  req.onload = showResult;
  req.send(null);
}