"use strict";

require('dotenv').config({path: '../.env'});

let express = require('express'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    serveStatic = require('serve-static'),
    github = require('octonode'),
    request = require('request'),
    path = require('path'),
    static_assets = serveStatic(path.join(__dirname, '../admin.frontend/')),
    http = require('http'),
    app = express();

// Только запросы к соответствующему домену должны рассматриваться
app.use(function(req, res, next) {
    if (req.headers.host == 'admin.frontender.info') {
        return next();
    }
    res.status(401).end();
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true
}));

// Отдаем статику, если разрешение файлов js или css
app.use(function(req, res, next) {
    if (/\.(?:js|css)$/.test(req.path)) {
        return static_assets(req, res, next);
    }
    return next();
});

// Аутентификация
app.get('/', function(req, res, next) {

    if (typeof req.session.access_token !== "undefined") {
        return next();
    }

    // Не аутентифицирован
    if (
        (typeof req.query.code === "undefined") &&
        (typeof req.query.state === "undefined")
    ) {

        console.log('step 1');
        // Первая стадия аутентификации
        let uuid = require('node-uuid'),
            state = uuid.v4(),
            url = 'https://github.com/login/oauth/authorize',
            client_id = process.env.APP_PUBLIC,
            redirect_uri = 'http://admin.frontender.info/',
            scope = 'read:org';

        req.session.auth_state = state;
        res.redirect(url +
            '?client_id=' + client_id +
            '&redirect_uri=' + redirect_uri +
            '&scope=' + scope +
            '&state=' + state);

    } else if (
        (typeof req.session.auth_state !== "undefined") &&
        (typeof req.query.code !== "undefined") &&
        (typeof req.query.state !== "undefined") &&
        (req.session.auth_state == req.query.state)
    ) {
        console.log('step 2');
        // Вторая стадия аутентификации
        request.post({
            url: 'https://github.com/login/oauth/access_token',
            headers: {
                'Accept': 'application/json'
            },
            form: {
                client_id: process.env.APP_PUBLIC,
                client_secret: process.env.APP_SECRET,
                code: req.query.code,
                state: req.query.state
            }
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Сохраняем в сессии токен авторизации, скоуп, тип токена
                let answer = JSON.parse(body);
                req.session.access_token = answer.access_token;
                req.session.scope = answer.scope;
                req.session.token_type = answer.token_type;
                res.redirect('http://admin.frontender.info/');
            } else {
                res.status(response.statusCode);
                res.end(error);
            }
        });
    }
});

// Авторизация
app.get('/', function(req, res, next) {
    console.log('autorization');
    // Инициализируем API github
    let client = github.client(req.session.access_token)
        , ghme = client.me();

    // Каждый раз проверяем является ли пользователь членом организации
    ghme.orgs(function (error, orgs) {
        if (error !== null){
            console.log(error);
            console.log(orgs);
            res.status(401).end('Can\'t get organizations list');
        }
        let index = orgs.length;
        while(index--){
            if (orgs[index].login === 'FrontenderMagazine') {
                return next();
            }
        }
        res.status(401).end('Not in organization');
    });
});

// Показать приложение
app.get('/', function(req, res, next) {
    console.log('page');
    res.sendFile(path.join(__dirname, '../admin.frontend/index.html'));
});

// Запускаем сервер
let server = app.listen(3000, function() {
    let host = server.address().address,
        port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
    if(typeof process.env.APP_SECRET === "undefined") {
        new Error('envirnment fails');
    }
});
