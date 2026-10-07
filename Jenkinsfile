pipeline {
    agent any

    tools {
    nodejs 'NodeJS 22'
    }

    triggers {
        pollSCM('H/5 * * * *')
        cron('H 8 * * 1-5')
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Cypress Regression') {
            steps {
                sh 'npm run cy:run:regression:ci'
            }
        }
    }

    post {
        always {
        junit testResults: 'reports/*.xml', allowEmptyResults: true
        }

        success {
            echo 'Cypress regression suite passed successfully.'
        }

        failure {
            echo 'Cypress regression suite failed. Review the test results.'
        }
    }

    
}