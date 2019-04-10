'use strict'

import morgan from 'morgan'

const loggerProduction = () => morgan('combined')
const loggerDevelopment = () => morgan('dev')

module.exports = { loggerProduction, loggerDevelopment }
