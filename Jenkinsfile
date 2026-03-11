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
          script {
              def packageJson = readJSON file: 'package.json'
              PACKAGE_NAME = packageJson.name
              PACKAGE_VERSION = packageJson.version
              echo "Building ${PACKAGE_NAME} version ${PACKAGE_VERSION}"
          }
        } // end dir
      } // end steps
    } // end stage
    stage ('Test') {
      steps {
        dir('backend') {
          sh 'npm run test:coverage > coverage.txt'
          sh 'ls -l'
          sh 'cat coverage.txt'
        } // end dir
      } // end steps
    } // end stage
    stage ('Dump e Tag') {
      dir('backend') {
        steps {
          sh 'git config user.name'
        }
      }
    }
  }// end stages
}
