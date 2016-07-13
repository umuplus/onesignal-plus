var $onesignal = require('./onesignal').$instance;

$onesignal.setup({api_key: 'API_KEY'});

$onesignal.post('notifications', {
    app_id: 'APP_ID',
    contents: {en: 'Hi!'},
    include_player_ids: ['PLAYER_ID']
}, function (error, data) {
    console.log(error, data);
});
