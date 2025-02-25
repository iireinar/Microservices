
package br.com.noface.service.registry;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;


/**
 * @author ranierigeroldi@gmail.com
 */
@EnableEurekaServer
@SpringBootApplication
public class ServiceRegistryApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(ServiceRegistryApplication.class, args);
    }
    
}
