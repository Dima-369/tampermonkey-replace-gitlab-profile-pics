// ==UserScript==
// @name        gitlab-replace-profile-pic
// @namespace   https://github.com/Gira-X/tampermonkey-replace-gitlab-profile-pics
// @include     about:addons
// @version     1
// @include     https://gitlab.com/*
// @include     https://gitlab.com
// @grant       none
// @updateURL   https://raw.githubusercontent.com/Gira-X/tampermonkey-replace-gitlab-profile-pics/master/script.js
// @downloadURL https://raw.githubusercontent.com/Gira-X/tampermonkey-replace-gitlab-profile-pics/master/script.js
// ==/UserScript==

updateEveryMs = 500;

// the avatar and gitlab name can be retrieved from the user profile at
// https://gitlab.com/Gira

originalAvatarUrl = 'https://gitlab.com/uploads/user/avatar/272886/small-me.png';
newAvatarUrl = 'https://i.imgur.com/uEQKnJc.png';
originalProfileId = 'Gira';
originalProfileName = 'Dmytro Butemann';
newProfileName = 'logic man';

// needs to be called continuously to update the inline dialogs,
// like the Assign To dialog, fast enough
function updateUrls() {
    var i;
    var tags = document.getElementsByTagName('img');
    for (i = 0; i < tags.length; i++) {
        if (tags[i].src.indexOf(originalAvatarUrl) > -1) {
            tags[i].src = tags[i].src.replace(originalAvatarUrl, newAvatarUrl);
        }
    }

    var imageTags = document.getElementsByTagName('image');
    for (i = 0; i < imageTags.length; i++) {
        if (imageTags[i].href.indexOf(originalAvatarUrl) > -1) {
            imageTags[i].href.baseVal =
                imageTags[i].href.baseVal.replace(originalAvatarUrl, newAvatarUrl);
        }
    }

    var textNodes = document.evaluate("//text()", document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var searchRE = new RegExp(originalProfileName, 'gi');
    for (i = 0; i < textNodes.snapshotLength; i++) {
        var node = textNodes.snapshotItem(i);
        if (node.data.indexOf(originalProfileName) > -1) {
            node.data = node.data.replace(searchRE, newProfileName);
        }
    }

    searchRE = new RegExp(originalProfileId, 'gi');
    for (i = 0; i < textNodes.snapshotLength; i++) {
        var node = textNodes.snapshotItem(i);
        if (node.data.indexOf(originalProfileId) > -1) {
            node.data = node.data.replace(searchRE, newProfileName);
        }
    }

    setTimeout(updateUrls, updateEveryMs);
}

updateUrls();
