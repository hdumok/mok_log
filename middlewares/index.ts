/**
 * Created by hdumok on 2016/11/4.
 */

'use strict'

import fs from 'fs'
import path from 'path'
import compose from 'koa-compose'

const middlewaresRoot = path.join(ROOT, 'middlewares')
const middlewaresFile = fs.readdirSync(middlewaresRoot)
const middlewares = []

for (let file of middlewaresFile) {
  if (file === 'index.js') continue

  middlewares.push(require(path.join(middlewaresRoot, file)).default)
}

export default compose(middlewares)
