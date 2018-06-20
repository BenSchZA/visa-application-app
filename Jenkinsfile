pipeline {
  agent {
    node {
      label 'any'
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