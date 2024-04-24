const configURL = 'http://config_service:3071/config'
module.exports = {
  apps: [{
    name: 'ara-gate',
    script: 'gate',
    args: configURL
  }, {
    name: 'ara-radio',
    script: 'radio',
    args: configURL
  }, {
    name: 'ara-data',
    script: 'data',
    instances: 2,
    exec_mode: 'cluster',
    args: configURL
  }, {
    name: 'ara-lock',
    script: 'lock',
    args: configURL
  }, {
    name: 'ara-file',
    script: 'file',
    args: configURL
  }, {
    name: 'ara-post',
    script: 'post',
    args: configURL
  }]
}