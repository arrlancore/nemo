'use strict'

// Load env variable from .env file
function loadEnv () {
  const dotenv = require('dotenv')
  const result = dotenv.config()

  if (result.error) {
    throw result.error
  }
  console.log('[Loaded] .env')
}
if (process.env.NODE_ENV !== 'production') {
  loadEnv() // on production use your version control env variable
}

// setup the default config
const defaultConfig = {
  appName: 'backend-app',
  db: process.env.DB_URI || 'mongodb://username123:password123@ds349587.mlab.com:49587/ftumj-db',
  apiPort: process.env.PORT || 3030,
  sessionSecret: process.env.SECRET || 'lo7er!',
  sessionCollection: 'sessions',
  jwt: {
    session: false,
    secret:
      '5QdYLbXsONJJDkoEyQPk3aR7vng721veBww9pPglW1tRzp4nnUz3f4AewUPZl9YyyK590vdErx2KBfTu66GOrUOZs6CO9XzMAmQ8hddNqA7oVuV0cUuvEl7Hskqbor'
  },
  dbOptions: {
    useCreateIndex: true,
    useNewUrlParser: true
  },
  client: {
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID || 'aaa',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'aaa',
      callback: process.env.GOOGLE_CLIENT_CALLBACK || 'aaa'
    }
  }
}

/**
 * Enviroment specific configuration
 * @type {{prod: {}, dev: {}, test: {apiPort: number}}}
 */
const envConfig = {
  seed: {},
  prod: {},
  dev: {},
  test: {
    apiPort: 3100
  }
}

/**
 * Loads config based on the current environment
 * @returns {*}
 */
function loadConfig () {
  const env = process.env.NODE_ENV || 'dev'

  if (!envConfig[env]) {
    throw new Error(
      `Environment config for environment '${env}' not found. process.env.NODE_ENV must be one of '${Object.keys(
        envConfig
      )}'`
    )
  }

  console.log('[INFO] config loaded for environment: ', env)

  // merge default config with environment specific config
  return Object.assign({}, defaultConfig, envConfig[env])
}

export default loadConfig()
