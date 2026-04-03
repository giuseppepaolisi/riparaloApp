@Library('jenkins-shared-library') _
log.info 'Starting'
pipeline {
    agent {
        docker {
            image 'node:20-alpine'
            label 'test-agent'
        }
    }
    parameters {
        string(name: 'VERSION', defaultValue: '1.0.0', description: 'Versione della build')
        choice(name: 'ENVIRONMENT', choices: ['Dev', 'Staging', 'Prod'], description: 'Ambiente di destinazione')
        booleanParam(name: 'RUN_TESTS', defaultValue: true, description: 'Flag per eseguire i test')
    }
    environment {
        GITHUB_ACCESS = credentials('github-token')
    }
    stages {
        stage('CheckOut') {
            steps {
                sh 'echo "--- checkout -----"'

                sh 'git remote -v'
            }
        } // end stage 1
        stage('Build') {
            steps {
                dir('backend') {
                    echo '--- Inizio Build ---'
                    sh 'npm install'
                }
            }
        } // end stage 2
        stage('Test') {
            // Flag per eseguire i test
            when {
                expression { params.RUN_TESTS == true }
            }
            steps {
                dir('backend') {
                    echo '--- Inizio test ----'
                    sh 'npm run test:coverage'
                }
            }
        } // end stage 3
        stage('Credenziali') {
            steps {
                sh "echo '----> ${GITHUB_ACCESS}'"
                echo '---------------'
                echo "${GITHUB_ACCESS}"
            }
        } // end stage
        stage ('Project_Name') {
          steps {
            dir('backend') {
              script {
                  def packageJson = readJSON file: 'package.json'
                  PACKAGE_NAME = packageJson.name
                  PACKAGE_VERSION = packageJson.version
                  echo "Name: ${PACKAGE_NAME} version: ${PACKAGE_VERSION}"
              }
            }
          }
        } // end stage 
    }
    post {
        always {
            echo '--- Pulizia Workspae ---'
            cleanWs() 
        }
        success {
            echo 'La build è terminata con successo!'
        }
        failure {
            echo 'La build è fallita.'
        }
    }
}
