# Library Management System
A library management system, is a microservice-based web application that allows the communication between librarian and students. The librarian can add new books to the library, update book related information, remove outdated books and handle student requests. On the other hand, students can view the avaialable books, borrow these book and return them back. The webapp is developed using total 4 microservices where Angular handles frontend operations, one Spring Boot backend handles database related operations, the other ones handles core business logic and lastly mysql to manage user related data.

## Scope ##
The deployment scripts would create 2 worker nodes within [AWS EKS](https://aws.amazon.com/eks/) cluster automated using [Terraform](https://www.terraform.io/docs/providers/aws/index.html) scripts. All routing is managed internally by Service Names, so no IP's needs to be edited. We have two Spring Boot(Load Balancers), MySQL(Load Balancer) backend containers and Angular(Load Balancer) frontend container.

Dependancies

## Dependancies

We need [Terraform](https://www.terraform.io/downloads.html), [Docker](https://docs.docker.com/get-docker/) for running the deployment.
## Deployment Scripts for running project ##
## Initial set up
Keep you Docker up and running
Clone the project, and step into the infra_deployment
```bash
terraform init
terraform plan
terraform apply
```

![Screenshot from 2020-12-01 01-14-10](https://user-images.githubusercontent.com/48415852/101262861-8c21e200-370f-11eb-991a-3f02422ba0a1.png)

![Screenshot from 2020-12-01 01-14-17](https://user-images.githubusercontent.com/48415852/101262865-90e69600-370f-11eb-9af5-be803458b73a.png)

This will give an output for config file and config-map-aws-auth

Replace local C://<>/.kube/config file with this config

![Screenshot from 2020-12-01 01-14-45](https://user-images.githubusercontent.com/48415852/101262913-e58a1100-370f-11eb-9229-3fb8d679700b.png)

Copy the config-map-aws-auth into a YAML file and run the following command

``` bash
kubectl apply -f config-map-aws-auth.yaml 
```
![Screenshot from 2020-12-01 01-15-27](https://user-images.githubusercontent.com/48415852/101262916-ea4ec500-370f-11eb-93d3-c20681189d04.png)

## Running the User story setup within EKS Cluster
Step into the deployments_services folder

Run the following YAML files in "SEQUENCE" (this is important since mysql needs to be in place before the persistent volume is created)
This will create Load balancers for all apps required by external User
```
kubectl apply -f mysql-deployment.yaml
kubectl apply -f mysql-pv.yaml
kubectl apply -f mysql-deployment.yaml
kubectl apply -f mysql-pv.yaml
kubectl apply -f spring-backend2db.yml
kubectl apply -f spring-backend.yml
kubectl apply -f angular-app.yml
kubectl get deployments
kubectl get svc 
```
![Screenshot from 2020-12-01 01-17-38](https://user-images.githubusercontent.com/48415852/101262920-ec188880-370f-11eb-8f90-8e9e36156893.png)

![Screenshot from 2020-12-01 01-17-43](https://user-images.githubusercontent.com/48415852/101262922-ede24c00-370f-11eb-8a8d-b70dbcdc225c.png)

## Final set up for Grapfana and Promethues
Step into monitoring
cd D:\<>\DeploymentEKS\services_deployment\monitoring

Run the following commands
```bash
kubectl create namespace monitoring
kubectl create -f clusterRole.yaml -n monitoring
kubectl create -f config-map.yaml -n monitoring
kubectl create -f prometheus-deployment.yaml -n monitoring
kubectl create -f prometheus-service.yaml -n monitoring
kubectl create -f grafana-datasource-config.yaml -n monitoring
kubectl create -f grafana-datasource-deploy.yaml -n monitoring
kubectl create -f grafana-datasource-service.yaml -n monitoring
kubectl get deployments -n monitoring
kubectl get svc -n monitoring
kubectl get svc -n monitoring
```
![Screenshot from 2020-12-01 01-19-28](https://user-images.githubusercontent.com/48415852/101262924-efac0f80-370f-11eb-96fb-853252e114a6.png)

## Accessing the IP's

You need to wait approx 2mins before each deployment is up and running, you and keep a check on the system status using below commands:
```
kubectl get deployments
kubectl get pods
kubectl describe pod <podname> => to see error
kubectl get deployment -n monitoring
kubectl get svc -n monitoring
kubectl logs -f <podname>
kubectl exec -it <mysql-podname> /bin/bash
mysql -u <rootuser as in springboot> -p
kubectl get pv
kubectl get persistentvolumeclaim 
```

## Accessing the Kubernetes DashBoard

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.4/aio/deploy/recommended.yaml
kubectl proxy

//Visit this url
http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/

```
![Screenshot from 2020-12-01 01-22-56](https://user-images.githubusercontent.com/48415852/101262927-f33f9680-370f-11eb-85d6-3d88411f62eb.png)
![Screenshot from 2020-12-01 01-23-21](https://user-images.githubusercontent.com/48415852/101262929-f5095a00-370f-11eb-83b2-4c8ebeb962a8.png)



## Steps to get the token


```
kubectl apply -f https://gist.githubusercontent.com/chukaofili/9e94d966e73566eba5abdca7ccb067e6/raw/0f17cd37d2932fb4c3a2e7f4434d08bc64432090/k8s-dashboard-admin-user.yaml

kubectl get sa admin-user -n kube-system

kubectl describe sa admin-user -n kube-system

kubectl describe secret admin-user-token-tr6tr -n kube-system

kubectl proxy
```
![Screenshot from 2020-12-01 01-25-37](https://user-images.githubusercontent.com/48415852/101262932-f89ce100-370f-11eb-98de-94d5ca5bf379.png)
![Screenshot from 2020-12-01 01-26-13](https://user-images.githubusercontent.com/48415852/101262935-f9ce0e00-370f-11eb-9a3c-122ff2a092a1.png)


## Kubernetes Dashboard for the webapp
![Screenshot from 2020-12-01 01-26-19](https://user-images.githubusercontent.com/48415852/101262937-fb97d180-370f-11eb-901d-496673fad2a1.png)
![Screenshot from 2020-12-01 01-26-26](https://user-images.githubusercontent.com/48415852/101262939-fd619500-370f-11eb-9dad-5fe11fb94f58.png)
![Screenshot from 2020-12-01 01-26-33](https://user-images.githubusercontent.com/48415852/101262941-ffc3ef00-370f-11eb-910e-22304e387684.png)
![Screenshot from 2020-12-01 01-26-36](https://user-images.githubusercontent.com/48415852/101262943-00f51c00-3710-11eb-90af-890a9ba61d73.png)
![Screenshot from 2020-12-01 01-26-41](https://user-images.githubusercontent.com/48415852/101262944-02bedf80-3710-11eb-9be7-38aed36a9e3c.png)
![Screenshot from 2020-12-01 01-26-45](https://user-images.githubusercontent.com/48415852/101262948-05213980-3710-11eb-98b1-3b56783bab26.png)
![Screenshot from 2020-12-01 01-26-52](https://user-images.githubusercontent.com/48415852/101262954-06526680-3710-11eb-9fcc-36fdcadb444c.png)
![Screenshot from 2020-12-01 01-26-55](https://user-images.githubusercontent.com/48415852/101262958-07839380-3710-11eb-9f34-8c83e3a1a600.png)
![Screenshot from 2020-12-01 01-26-59](https://user-images.githubusercontent.com/48415852/101262962-094d5700-3710-11eb-9819-09165ee13017.png)


## Kubernetes Dashboard for Prometheus and Grafana
![Screenshot from 2020-12-01 01-27-13](https://user-images.githubusercontent.com/48415852/101262963-0bafb100-3710-11eb-8c79-a8dedd117212.png)
![Screenshot from 2020-12-01 01-27-17](https://user-images.githubusercontent.com/48415852/101262967-0ce0de00-3710-11eb-8e44-a4fca3bf2c2e.png)
![Screenshot from 2020-12-01 01-27-20](https://user-images.githubusercontent.com/48415852/101262969-0eaaa180-3710-11eb-9cfd-a4197281db86.png)
![Screenshot from 2020-12-01 01-27-23](https://user-images.githubusercontent.com/48415852/101262970-0fdbce80-3710-11eb-9f44-c0ca3043a542.png)
![Screenshot from 2020-12-01 01-28-06](https://user-images.githubusercontent.com/48415852/101262973-12d6bf00-3710-11eb-89bd-fc797b649f49.png)
![Screenshot from 2020-12-01 01-28-13](https://user-images.githubusercontent.com/48415852/101262975-14a08280-3710-11eb-8d50-a3e752daf0e1.png)
![Screenshot from 2020-12-01 01-29-09](https://user-images.githubusercontent.com/48415852/101262978-15d1af80-3710-11eb-9f06-41768c0c3a0b.png)
![Screenshot from 2020-12-01 01-29-22](https://user-images.githubusercontent.com/48415852/101262981-179b7300-3710-11eb-96be-43cf01301e97.png)


## Reclaiming resources
Once you are done, run the below commands in no particular order, except terraform destroy to be last
```
kubectl delete deployment mysqldeploy
kubectl delete deployment mongodeploy
kubectl delete deployment springdeploy
kubectl delete deployment billboarddeploy
kubectl delete deployment sentimentdeploy
kubectl delete deployment reactdeploy
kubectl delete deployment aspdeploy
kubectl delete deployment grafana -n monitoring
kubectl delete deployment prometheus-deployment -n monitoring

kubectl delete svc mysqldevops
kubectl delete svc mongodevops
kubectl delete svc springdevops
kubectl delete svc billboarddevops
kubectl delete svc sentimentdevops
kubectl delete svc reactdevops
kubectl delete svc aspdevops
kubectl delete svc grafana -n monitoring
kubectl delete svc prometheus-service -n monitoring
terraform destroy
```



