pipeline {
  agent none
  stages {
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