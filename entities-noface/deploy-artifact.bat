set JAR=C:\dev\microservices\entities-noface\build\libs\entities-noface-1.0.0.0.jar

mvn deploy:deploy-file -DgroupId=br.com.noface -DartifactId=entities-noface -Dversion=1.0.0.0 -Dpackaging=jar -Dfile=%JAR% -DrepositoryId=noface -Durl=http://192.168.241.171:8081/repository/noface/