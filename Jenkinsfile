pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Cypress Regression') {
            steps {
                sh 'npm run cy:run:regression'
            }
        }
    }

    post {
        success {
            echo 'Cypress regression suite passed successfully.'
        }

        failure {
            echo 'Cypress regression suite failed. Review the test results.'
        }
    }
}