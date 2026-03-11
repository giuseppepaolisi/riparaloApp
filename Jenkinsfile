pipeline {
  agent any
  tools {
    nodejs '20.20'
  }
  environment {
    GIT_CREDENTIALS = credentials('github-token')
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
      steps {
        dir('backend') {
          sh 'ls -l'
          sh 'git config user.email "jenkins@yourdomain.com"'
          sh 'git config user.name "Jenkins CI"'
          sh 'git tag -a v${PACKAGE_VERSION} -m "Release version ${PACKAGE_VERSION}"'
          sh 'git push origin v${PACKAGE_VERSION}'
        } // end dir
      }
    }
  }// end stages
}
