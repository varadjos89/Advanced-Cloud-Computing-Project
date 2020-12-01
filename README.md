# Instructions

## Setup kubernetes
1. Go to k8s folder
2. To create k8s cluster  
    * `ansible-playbook -v setup-k8s-cluster.yml --extra-var "@extra_vars.json" `
    * `ansible-playbook -v create-rds.yml --extra-var "@extra_vars.json"`
    * Establish peering connection to connect k8s vpc with database vpc
    * Add 0.0.0.0/0 to the k8s route table as internet gateway

## Install logging part including ElasticSearch, Kibana and Fluentd
1. Go to helm-charts folder
2. `kubectl create ns logging`
3. `helm install elasticsearch ./elasticsearch -n logging`
4. `helm install kibana ./kibana -f ./tmp/kibana.yml -n logging`
5. `kubectl apply -f ./tmp/elasticsearch-output.yml -n logging`
6. `kubectl apply -f ./tmp/apache-log-parser.yml -n logging`
7. `helm install fluentd ./fluentd -f ./tmp/fluentd.yml -n logging`

## Install metrics part
1. `kubectl create ns metrics`
2. `helm install prometheus ./prometheus -n metrics`
3. `helm install grafana ./grafana -n metrics`
4. Get admin password by: `kubectl get secret --namespace metrics grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo`
5. Access grafana by proxying  
`export POD_NAME=$(kubectl get pods --namespace metrics -l "app.kubernetes.io/name=grafana" -o jsonpath="{.items[0].metadata.name}")`  
`kubectl --namespace metrics port-forward $POD_NAME 3000`
6. Go to url `127.0.0.1:3000` and login with username `admin` and password from step 4
7. Add data source by providing promethus server ip address
8. Import dashboard with id 6417

## Install backend services
1. Go to helm-charts folder
2. Copy the database ip address from AWS and change the value of 'databaseUrl' in `helm-charts/backend2db/values.yml`
3. `helm install backend2db ./backend2db`
4. Copy the public ip address from k8s cluster and change the value of `backUrl` in `helm-charts/backend/values.yml`
5. `helm install backend ./backend`

## Install frontend services
1. Angular requires Node.js in your system, you can download Node Package Manager(NPM) from https://nodejs.org/en/
2. Never download the latest one instead always download the recommended version of NPM
3. Type “node -v” command to check which version is installed
4. Install Angular CLI using "npm install -g @angular/cli"
5. If it doesn’t work then login as a ROOT and try reinstalling it.
6. Check angular version using command “ng -version”
7. Go to webapp folder and run command “npm install” to install all the required dependencies
8. Then go to webap/src/app/shared/services/api.service.ts
9. Inside file “api.service.ts” you can find an object named as “public booksRoot: string=”
10. Assign your API url to that object within the double quotes
11. Then run “npm run build” to build your project files
12. After that you can build your docker image using “docker build -t {image name} .”
13. `helm install frontend ./frontend`
