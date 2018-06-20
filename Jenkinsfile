pipeline {
  agent any
  stages {
    stage('Development') {
      steps {
        sh 'docker-compose build && docker-compose up'
      }
    }
  }
}