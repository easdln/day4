module.exports = {
  db: {
    main: {
      host: 'sql2014.dev.lan',
      database: 'L84LexPractice1',
      dialect: 'mssql',
      user: 'lib83',
      password: 'Master_0895',
      isolationLevel: 'READ_UNCOMMITTED',
      requestTimeout: 600000
    },
    session: {
      port: '6379'
    }
  },
  common: {
    context: 'source',
    logging: {
      level: 'error'
    }
  },
  applications: {
    gate: {
      sessionLifeTime: 1800,
      validation: {
        passwordRegularExpression: /^[a-zA-Z0-9]{3,}$/
      }
    },
    post: {
      defaultEmailId: 'default',
      emails: {
        'default': {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          user: '',
          pass: '',
          userName: ''
        }
      }
    },
	jsreport:{
		protocol:'http',
		host: 'localhost',
		port:3070,
		script : 'ecosoft-lexema8-jsreport-service',
		core: {
        extensions: {
          'html-embedded-in-docx': {}
        }
		}
	}
  },
  docs: {
    type: 'library',
    access: 'strict'
  },
  moxie: {
    port: 3337
  }
}