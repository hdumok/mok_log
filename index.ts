/**
 * Created by hdumok on 2016/11/3.
 */
declare var NODE_ENV:string
declare var ROOT:string
declare var CONSTANTS:any
declare var CONFIG:any
declare var LOG_LEVEL:string

//TODO 替换Promise
NODE_ENV = process.env.NODE_ENV || 'development'
ROOT = __dirname
CONSTANTS = require('./var')
CONFIG = require('./config')[NODE_ENV]
LOG_LEVEL = process.env.LOG_LEVEL || 'LOG'

//require('./app/log')
require('./app/server')
