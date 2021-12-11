const express = require('express');
const path = require('path');
const ngApp = express();
ngApp.use(express.static('./dist/twitee-lucky-okoedion'));
ngApp.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/twitee-lucky-okoedion/index.html'));
});
ngApp.listen(process.env.PORT || 8080);