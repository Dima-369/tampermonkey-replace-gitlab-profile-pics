Change a Gitlab user's profile picture and name to anything you like.

# Installation

Install [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) for Google Chrome and click [here](https://raw.githubusercontent.com/Gira-X/tampermonkey-replace-gitlab-profile-pics/master/script.user.js).

Then you have to adjust the `originalAvatarUrl`, `originalProfileId` and `originalProfileName` variables to your liking.

# Other domains apart from gitlab.com

If you have GitLab hosted on a different domain, you have to adjust those lines in the script:

```javascript
// @include     https://gitlab.com/*
// @include     https://gitlab.com
```

# Screenshot

![](./screenshots/1.png)
