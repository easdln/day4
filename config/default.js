module.exports = {
  db: { 
    main: {
      host: '',
      database: '', 
      dialect: 'mssql',
      user: '',
      password: '',
      requestTimeout: 600000
    },
    session: {
      port: '6379'
    }      
  },
  moxie: {
    port: '3337'
  },
  common: {
    context: 'source',
    logging: {
      level: 'error'
    }
  },
  applications: {
    gate: {
      sessionLifeTime: 180,
      validation: {
        passwordRegularExpression: /^[a-zA-Z0-9]{3,}$/
      }
    },
    radio: {
      channels: {
        'ecosoft-lexema8-lexdesk': ['messageCreated', 'userIsTyping']
      }
    },
    file: {
      // enablePreviewFiles: 'true'
    },
    jsreport: {
      protocol: 'http',
      host: 'localhost',
      port: 3070,
      script: 'ecosoft-lexema8-jsreport-service',
      core: {
          extensions: {
            'html-embedded-in-docx': {}
          }
      }
    }
  }
}