/**
 * Created by hdumok on 2016/11/4.
 */

'use strict'

import fs from 'fs'
import path from 'path'
import mongoose from 'mongoose'

mongoose.connect(CONFIG.mongo.url, CONFIG.mongo.options)

const modelsRoot = path.join(__dirname, 'models')
const modelsFile = fs.readdirSync(modelsRoot)

for (var file of modelsFile) {
  require(path.join(modelsRoot, file))
}

export default mongoose.models
