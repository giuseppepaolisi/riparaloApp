pipeline {
  agent docker {
    { image 'node:24.14.0-alpine3.23' }
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
