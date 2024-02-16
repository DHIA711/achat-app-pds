pipeline {

    environment {

     springF="Achat_back"   
     angularF="Achat_front"   
     KUBECONFIG_CREDENTIAL = 'kubeconfig' 
   }

          agent any

    stages{



          
          //Build de l’image (spring + angular) +   Déposer les deux images sur DockerHub
          stage("build and push back/front images"){

                 steps{

                    script {
            
             echo "====++++executing build and push back + front images++++===="
    
          withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', passwordVariable: 'PASS', usernameVariable: 'USER')]){
         
                             sh "docker build -t $USER/achat_back_prod ${springF}/"

                             sh "docker build -t $USER/achat_front_prod ${angularF}/"

                             sh "echo $PASS | docker login -u $USER --password-stdin"

                             sh "docker push $USER/achat_back_prod"

                             sh "docker push $USER/achat_front_prod"
                         }
                 }
            }
         post{

             always{
                 sh "docker logout"
             }
        
             success{
                 echo "====++++push image execution success++++===="
             }
        
             failure{
                 echo "====++++push image execution failed++++===="
             }
    
            }

          }

    

        

                stage('Deploy spring to Kubernetes') {
 
            steps {
                script {
                    // Load the kubeconfig credential
                    withCredentials([file(credentialsId: "${KUBECONFIG_CREDENTIAL}", variable: 'KUBECONFIG')]) {
                        // Set the KUBECONFIG environment variable to the kubeconfig file path
                        sh "export KUBECONFIG=${KUBECONFIG}"

                        // Now you can use kubectl commands to interact with the Kubernetes cluster
                        sh "cd Manifests_k8s && kubectl delete -f springapp-deploy.yaml"
                        sh "cd Manifests_k8s && kubectl apply -f springapp-deploy.yaml"
                    }
                }
             }
          }

              stage('Deploy angular to Kubernetes') {
 
            steps {
                script {
                    // Load the kubeconfig credential
                    withCredentials([file(credentialsId: "${KUBECONFIG_CREDENTIAL}", variable: 'KUBECONFIG')]) {
                        // Set the KUBECONFIG environment variable to the kubeconfig file path
                        sh "export KUBECONFIG=${KUBECONFIG}"
                        sh "cd Manifests_k8s && kubectl delete -f angularapp-deploy.yaml"
                        sh "cd Manifests_k8s && kubectl apply -f angularapp-deploy.yaml"
                        
                        // Add more kubectl commands as needed
                    }
                }
            }
        }  


    }
              


}

