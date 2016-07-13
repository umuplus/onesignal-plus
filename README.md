# onesignal-plus
one signal client library for node.js

**onesignal-plus** is an extensible node.js client library for one signal service.
It's as simple as possible to support large amount of methods in official API documentation at https://documentation.onesignal.com/docs/server-api-overview

#### Install

> npm install onesignal-plus

#### Settings

> **host:** 'onesignal.com'

> **port:** 443

> **version:** 'v1'

You can override these values by calling setup method which you need to pass your API KEY also.

> *$onesignal.setup({api_key: 'API_KEY'});* // you need to provide your api key for secure access

Once your client instance is ready, there are 4 methods you can call:

- GET
- POST
- PUT
- DELETE

*GET* and *DELETE* methods takes 2 parameters such as **path** and **callback**.
Path is for defining API method such as *players*, *players/1234567890*, *apps*, *apps/1234567890*, *notifications* and callback is for handling results.

*POST* and *PUT* methods takes 3 parameters such as **path**, **data** and **callback**.
Path is for defining API method such as players/1234567890, apps/1234567890, notifications/1234567890 and callback is for handling results.
Data parameter is for sending data to the server.

    var $onesignal = require('onesignal-plus').$instance;

    $onesignal.setup({api_key: 'API_KEY'});

    $onesignal.post('notifications', {
        app_id: 'APP_ID',
        contents: {en: 'Hi!'},
        include_player_ids: ['PLAYER_ID']
    }, function (errors, data) {
        console.log(errors, data);
    });

*Please check official documentation to learn how to use API methods*
