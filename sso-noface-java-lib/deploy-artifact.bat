set JAR=C:\dev\microservices\sso-noface-java-lib\build\libs\sso-noface-java-lib-1.0.0.0.jar

mvn deploy:deploy-file -DgroupId=br.com.noface -DartifactId=sso-noface-java-lib -Dversion=1.0.0.0 -Dpackaging=jar -Dfile=%JAR% -DrepositoryId=noface -Durl=http://192.168.241.171:8081/repository/noface/