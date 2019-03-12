// my-custom-environment
const NodeEnvironment = require('jest-environment-node')
const uuidv1 = require('uuid/v1')
const { spawn } = require('child_process');

class ServerlessEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context)
    this.testPath = context.testPath
  }

  async setup() {
    console.log('start env setup')
    await super.setup();
    await this.createServerlessStack()
    console.log('Finish env setup')
    
    this.global.apiGatewayEndpoint = this.getAPIGatewayEndpoint()
  }

  async teardown() {
    delete this.global.apiGatewayEndpoint
    await this.destroyServerlessStack()
    await super.teardown()
  }

  runScript(script) {
    return super.runScript(script)
  }

  async createServerlessStack() {
    const uuid = uuidv1()
    const stageName = `acceptance-${uuid}`

    // Spawn serverless process and block on completion.
    // `serverless deploy --stage=${stageName}`
    const child = spawn('ls', ['-lh', '/usr']);

    // since these are streams, you can pipe them elsewhere
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)

    return new Promise((resolve, reject) => {
      child.on('close', code => {
        if (code === 0) {
          console.log(`Deployment of acceptance test stack ${(code === 0) ? 'suceeded' : 'failed'}`)
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  async destroyServerlessStack() {
      // Spawn serverless process and block on completion.
      // serverless destroy
      return Promise.resolve()
  }

  async getAPIGatewayEndpoint() {
      // Use NodeJS SDK to get endpoint.
      return "hi"
  }
}

module.exports = ServerlessEnvironment