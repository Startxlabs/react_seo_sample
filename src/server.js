'use strict';

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';

import useragent from 'express-useragent';
var childProcess = require('child_process');
import lodash from 'lodash';
import urlencode from 'urlencode';
import phantomjs from 'phantomjs-prebuilt';

const app = new Express();

app.use(useragent.express());

const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(Express.static(path.join(__dirname, 'static')));


app.get('*', (req, res, next) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {
      // in case of error display the error message
    console.log('data consoled : ' ,  req.url)
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      /*if(renderProps){
        //console.log('rendPr : ' , renderProps)
        renderHtmlPhantom(req, res, renderProps, next);
      }*/

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // renderHtmlPhantom(req, res, next);
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
        renderHtmlPhantom(req, res, next)
        //return res.render('index', { markup });
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

app.listen(3000, function () {
    console.log('application is listening on  port 3000');
});

/*app.use(function (req, res, next) {
    var agent = req.useragent.source;
    console.log(agent);

    //checking bot here. If it is a bot then render via phantom

    if (req.useragent.isPhantomJS == false) {
        //sent request to render via phantom
        return renderHtmlPhantom(req, res, next);
    } else {
        //sent request to render at cient borwser
        return next();
    }
});*/


function renderHtmlPhantom(req, res, next) {
    var url = 'http://localhost:3000' + urlencode.decode(req.url, 'gbk');
    console.log('-----BOT REQUEST URL----', url);
    console.log('url:' , url)
    console.log('req.url' , req.url)
    console.log('resp:' , res)
    var agent = req.useragent.source;

    //requesting phantom instance for redering the web page
    phantomInstance(url, function (err, result) {
      console.log('result :' , result)
        if (err) {
            res
                .status(404)
                .send('Internal server error');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(result);
            res.end();
        }
    });
};
function phantomInstance(url, callback) {
    var binPath = phantomjs.path;
    var childArgs = [
        path.join(__dirname, 'phantom-script.js'),
        '--disk-cache=false',
        '--load-images=false',
        url
    ]
    childProcess.execFile(binPath, childArgs, {
        maxBuffer: 500 * 1024
    }/*, function (err, stdout, stderr) {
        if (err) {
            return callback(err);
        }
        return callback(null, stdout);
    }*/)
}





/*function renderHtmlPhantom(req, res, next) {
    var url = 'http://localhost:8000' + urlencode.decode(req.url, 'gbk');
    console.log('-----BOT REQUEST URL----', url);
    //console.log('res : ' , res)
    

    // var resu = result
    // console.log('resu : ' , resu)
    //var agent = req.useragent.source;

    //requesting phantom instance for redering the web page
    phantomInstance(url, function (err, result) {
      console.log('result' , result)
        if (err) {
            res
                .status(404)
                .send('Internal server error');
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(result);
            res.end();

        }
    });
    // var txt = renderToString(<RouterContext {...result}/>)
    // return res.render('index', { txt });
   
};

// creating a phantom instance using phantom script file. more information can
// be found on phantomjs official page
function phantomInstance(url,res, result,callback) {
    var binPath = phantomjs.path;
    var childArgs = [
        path.join(__dirname, 'phantom-script.js'),
        '--disk-cache=false',
        '--load-images=false',
        url
    ]
    childProcess.execFile(binPath, childArgs, {
        maxBuffer: 500 * 1024
    })
    // var markup =  callback
    // return res.render('index', { markup });

    , function (err, stdout, stderr) {
      console.log('stdout' , stdout)
        if (err) {
            return callback(err);
        }
        //return callback(null, stdout);
    }
    
     
}*/

































// initialize the server and configure support for ejs templates
/*const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));*/




// define the folder that will be used for static assets
/*app.use(Express.static(path.join(__dirname, 'static')));

// universal routing and rendering
app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {
      // in case of error display the error message
    console.log('data consoled : ' ,  req.url)
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
      console.log('data 12 : ' , err , redirectLocation , renderProps)
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});*/

// start the server
/*const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});*/
