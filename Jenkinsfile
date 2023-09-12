def CredentialsId = "thanhnd56"
def	gitCredentialId= "545c2196-4572-4d4d-a53e-1580d0fa99bc"
def image="ite-pg-mm-web-dev"
def containerName="ite-pg-mm-web-dev"
def ppWebRegistry = "thanhnd56/${image}"
def dockerimage = ''
def lastSuccessfulBuildID  = 0
def artifacCredentialIds='jfrog-vtl-dev'
def artifactoryRegistry = '171.244.27.138:8082/viettel-develop'
def FullWS = './dist/viettel'

node ('jenkins_build') {
    try {
        checkout scm
        stage('Build') {
            checkout scm
//             checkout_from_reference()
            // sh "cd ${Workspace}"
			// sh 'rm -rf node_modules'
            sh "npm install -y"
            sh "npm i gzipper -g"
            sh "npm run prod"
            sh 'rm -rf node_modules/@angular/compiler-cli/ngcc/__ngcc_lock_file__'
            dockerimage = docker.build(ppWebRegistry + ":$BUILD_NUMBER" + " --build-arg SourceLink=${FullWS}", ' -f Dockerfile .')
        }

        stage('Push Image To Artifactory') {
            try{
                sh "docker tag $ppWebRegistry:$BUILD_NUMBER $artifactoryRegistry/$ppWebRegistry-single:$BUILD_NUMBER"

                // Login Artifactory
                withCredentials([usernamePassword(credentialsId: 'jfrog-vtl-dev', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                 sh "docker login -u $USERNAME -p $PASSWORD $artifactoryRegistry"
                }
                sh "docker push $artifactoryRegistry/$ppWebRegistry-single:$BUILD_NUMBER"
            } catch(e){
                echo "push image exception-" + e.toString()
            }
        }

    }catch (e) {
        currentBuild.result = 'FAILED'
        throw e
    } finally {
    }
}


node ("develop_run"){
    try {
        stage("Pull image from artifactory"){
            try{
                // Login Artifactory
                withCredentials([usernamePassword(credentialsId: 'jfrog-vtl-dev', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                 sh "docker login -u $USERNAME -p $PASSWORD $artifactoryRegistry"
                }
                sh "docker pull $artifactoryRegistry/$ppWebRegistry-single:$BUILD_NUMBER"
                sh "docker tag $artifactoryRegistry/$ppWebRegistry-single:$BUILD_NUMBER $ppWebRegistry-single:$BUILD_NUMBER"
            } catch(e){
                echo "pull image fail! "
            }
        }

        stage('Delete Docker Container if exists') {
            // stop and remove logs container
            try{
                sh "docker container stop $containerName"
                sh "docker container rm $containerName"
                echo "Delete $containerName Done"
            } catch(Exception e){
                echo " $containerName not exists or not running"
            }
        }

        stage("Run Transaction Docker Image"){
            try{
                sh "docker run -d -p 9002:80 --restart always --name $containerName $ppWebRegistry-single:$BUILD_NUMBER"
            } catch(e){
                echo "Run $containerName failure"
            }
        }

        stage("Delete Docker Image"){
            try{
                sh "docker image rm -f $ppWebRegistry-single:$BUILD_NUMBER"
                sh "docker image rm -f $artifactoryRegistry/$ppWebRegistry-single:$BUILD_NUMBER"
                echo "Delete image $ppWebRegistry-single:$BUILD_NUMBER successfull"
            } catch(Exception e){
                echo " Image $ppWebRegistry-single:$BUILD_NUMBER is not delete"
            }
        }
    }catch (e) {
        currentBuild.result = "FAILED"
        throw e
    } finally {

    }
}
