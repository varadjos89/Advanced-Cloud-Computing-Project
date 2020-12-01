FROM java:8-jdk-alpine

COPY ./target/ccwebapp-0.0.1-SNAPSHOT.jar /usr/app/

WORKDIR /usr/app

ENV database_url localhost

EXPOSE 8080

ENTRYPOINT java -jar ccwebapp-0.0.1-SNAPSHOT.jar