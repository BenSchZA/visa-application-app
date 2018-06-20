pipeline {
  agent {
    node {
      label 'NodeJS 10.5.0'
    }

  }
  stages {
    stage('Development') {
      steps {
        sh 'export PATH=/usr/local/bin:$PATH'
        sh '''npm install && export NODE_ENV=production

&& npm run build

&& npm start'''
      }
    }
  }
}