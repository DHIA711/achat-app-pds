# Étape de build
FROM maven:3.6.3-openjdk-8 AS build
WORKDIR /build
COPY pom.xml .
COPY src src
# Compilez le projet et créez le fichier .jar
# Assurez-vous que cette commande génère votre fichier jar dans le dossier target/
RUN mvn clean install -DskipTests

# Étape d'exécution
FROM openjdk:8-jdk-alpine
EXPOSE 8089
WORKDIR /app
# Copiez le fichier .jar depuis l'étape de build
COPY --from=build /build/target/AchatProject-1.0.jar /app/app.jar
CMD ["java", "-jar", "app.jar"]
