import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import logger from 'morgan'
import sassMiddleware from 'node-sass-middleware'

import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import moment from 'moment'

const helmet = require('helmet')

import {key} from './env.config'

const app = express()

app.use(helmet())

app.locals.moment = moment

// view engine setup
app.set('views', path.join(__dirname, 'resources/views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(sassMiddleware({
    src: path.join(__dirname, 'resources'),
    dest: path.join(__dirname, 'public'),
    includePaths: [path.join(__dirname), 'node_modules'],
    debug: (process.env.NODE_ENV === 'production') ? false : true,
    indentedSyntax: false, // true = .sass and false = .scss
    outputStyle: 'compressed'
}))

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

import session from 'express-session'
import ExpressMysqlSession from 'express-mysql-session'

const MySQLStore = ExpressMysqlSession(session)

import {database} from './env.config'

const sessionStore = new MySQLStore(database)

if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
}

app.use(session({
    name: 'sessionId',
    secret: key,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production'
    }
}))

// passport authentication
import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'

app.use(passport.initialize())
app.use(passport.session())

import * as UserModel from './app/models/User'
import VerifyToken from './app/controllers/auth/VerifyToken'
passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, done) => {
        
        VerifyToken(username, password, done)
    }
))

passport.serializeUser((user, done) => {
    return done(null, user.username)
} )

passport.deserializeUser((username, done) => {
    return UserModel.getUserByUsername(username, done)
} )

import api_router from './routes/api'
app.use('/api', api_router)

// csrf protection
import csrf from 'csurf'
const csrfProtection = csrf({ cookie: true })
app.use(csrfProtection)
app.use((req, res, next) => {

    res.locals.custom_csrf = req.csrfToken()

    next()

})

import public_router from './routes/public'
app.use('/', public_router)

import private_router from './routes/private'
app.use('/admin', private_router)

/** Swagger Setup */

const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
        info: {
            title: 'AA HR API Documentations', // Title (required)
            version: '1.0.0', // Version (required)
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            },
            responses: {
                UnauthorizedError: {
                    description: "Unauthorized",
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'integer',
                                        example: '401',
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Unauthorized.',
                                    }
                                }
                            }
                        }

                    }
                },
                InternalServerError: {
                    description: "Internal Server Error.",
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    status: {
                                        type: 'integer',
                                        example: '500',
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Internal Server Error.',
                                    }
                                }
                            }
                        }

                    }
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    // Path to the API docs
    apis: [
        './app/controllers/api/**/*.js',
        './app/controllers/auth/**/*.js'
    ],
};
  
// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(swaggerOptions)

app.use(
    '/app-docs', 
    swaggerUi.serve, 
    swaggerUi.setup(
        swaggerSpec,
        {
            explorer: true,
        }
    )
)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404))
})

// catch csrf error handler
app.use((err, req, res, next) => {

    // if csrf error
    if (err.code === 'EBADCSRFTOKEN') {

        return res.status(403).end()

    }

    next(err)

})

// error handler
app.use(function(err, req, res, next) {

    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

export default app
