Steps for angular app:

1.	Angular requires Node.js in your system, you can download Node Package Manager(NPM) from https://nodejs.org/en/
2.	Never download the latest one instead always download the recommended version of NPM
3.	Type “node -v” command to check which version is installed
4.	Install Angular CLI using "npm install -g @angular/cli"
5.	If it doesn’t work then login as a ROOT and try reinstalling it.
6.	Check angular version using command “ng -version”
7.	Go to webapp folder and run command “npm install” to install all the required dependencies
8.	Then go to webap/src/app/shared/services/api.service.ts
9.	Inside file “api.service.ts” you can find an object named as “public booksRoot: string=” 
10.	Assign your API url to that object within the double quotes
11.	Then run “npm run build” to build your project files
12.	After that you can build your docker image using “docker build -t {image name} .”
