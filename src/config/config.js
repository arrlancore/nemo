'use strict'

/**
 * Default config for all environment types
 * @type {{db: string, apiPort: number}}
 */
const defaultConfig = {
  appName: 'backend-app',
  db: 'mongodb://admin:mySecretP4ssword@ds137862.mlab.com:37862/dev-pbisnis',
  apiPort: 3000,
  sessionSecret:
    process.env.SECRET || 'lo7er!',
  sessionCollection: 'sessions',
  jwt: {
    session: true,
    secret:
      '5QdYLbXsONJJDkoEyQPk3aR7vng721veBww9pPglW1tRzp4nnUz3f4AewUPZl9YyyK590vdErx2KBfTu66GOrUOZs6CO9XzMAmQ8hddNqA7oVuV0cUuvEl7Hskqbor'
  },
  dbOptions: {
    useCreateIndex: true,
    useNewUrlParser: true
  }
}

/**
 * Enviroment specific configuration
 * @type {{prod: {}, dev: {}, test: {apiPort: number}}}
 */
const envConfig = {
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
