pipeline {
  agent any
  tools {
    nodejs '20.20'
  }
  stages {
    stage ('Build') {
      steps {
        dir('backend') {
          sh 'ls -l'
          sh 'npm install'
        } // end dir
      } // end steps
    } // end stage
    stage ('Test') {
      steps {
        dir('backend') {
          sh 'npm run test:coverage'
        } // end dir
      } // end steps
    } // end stage
  }// end stages
}
