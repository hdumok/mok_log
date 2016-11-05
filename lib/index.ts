/**
 * Created by hdumok on 2016/11/4.
 */

'use strict'

import fs from 'fs'
import path from 'path'

const libRoot = path.join(ROOT, 'lib')
const libFile = fs.readdirSync(libRoot)
const lib = {}

for (var file of libFile) {
  if (file === 'index.js') continue

  const out = require(path.join(libRoot, file))
  if (out.default) {
    lib[file.split('.')[0]] = out.default
  } else {
    Object.assign(lib, out)
  }
}

export default function *(next) {
  Object.assign(this, lib)

  yield next
}
