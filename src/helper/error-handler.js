'use strict'

module.exports = { errorHandler }

function errorHandler (err) {
  console.error(err.stack)
  let message = ''
  if (err.message) {
    message = { message: err.message }
  } else {
    let messageErr = JSON.stringify(err)
    message = { message: messageErr }
  }
  return message
}
