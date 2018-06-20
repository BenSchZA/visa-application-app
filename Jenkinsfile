pipeline {
  agent any
  stages {
    stage('Development') {
      steps {
        sh '''npm install && export NODE_ENV=production

&& npm run build

&& npm start'''
      }
    }
  }
}