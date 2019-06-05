const fs = require('fs-extra')
const CNAScripts = require('../..')
const utils = require('../../lib/utils')
const yaml = require('js-yaml')

utils.spawnAioRuntimeDeploy = jest.fn()

let scripts
let buildDir
let appDir
beforeAll(async () => {
  await global.mockFS()
  // create test app
  appDir = await global.createTestApp()
  await global.writeEnvTVM(appDir)
  await global.clearProcessEnv()
  scripts = await CNAScripts(appDir)
  buildDir = scripts._config.actions.dist
})

afterAll(async () => {
  await global.resetFS()
})

afterEach(async () => {
  // clean build files
  await fs.remove(buildDir)
})

test('Deploy actions should generate a valid .manifest-dist.yml for 1 zip and 1 js action', async () => {
  await global.fakeFiles(buildDir, ['action.js', 'action-zip.zip'])
  await scripts.deployActions()

  const manifest = yaml.safeLoad(fs.readFileSync(scripts._config.manifest.dist, 'utf8'))
  // todo don't copy these fixture names
  expect(manifest.packages[scripts._config.ow.package]).toHaveProperty('actions.action')
  expect(manifest.packages[scripts._config.ow.package]).toHaveProperty('actions.action-zip')
})

test('Deploy actions should fail if there are no build files', async () => {
  expect(scripts.deployActions.bind(this)).toThrowWithMessageContaining(['build', 'missing'])
})