/**
 * Created by hdumok on 2016/11/4.
 */

import mongoose from 'mongoose'
const Schema = mongoose.Schema

var LogSchema = new Schema({
  date: String,
  time: Number,
  server: String,
  content: String
})

mongoose.model('Log', LogSchema)
