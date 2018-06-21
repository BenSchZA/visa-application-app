pipeline {
  agent {
    docker {
      image 'node:6-alpine'
      args '-p 3000:3000'
    }

  }
  stages {
    stage('Config') {
      steps {
        sh 'export PORT=3000 && export NODE_ENV=production'
      }
    }
    stage('Build') {
      steps {
        sh 'npm install && npm build '
      }
    }
    stage('Deploy') {
      steps {
        sh 'npm start'
      }
    }
  }
}