package br.com.noface.geral.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.ComponentScan;


/**
 * @author ranierigeroldi@gmail.com
 */
@EnableEurekaClient
@SpringBootApplication
@ComponentScan({"br.com.noface.geral.api","br.com.noface.sso"})
@EntityScan("br.com.noface.entities.geral")
public class ApiGeralNofaceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGeralNofaceApplication.class, args);
    }
    
}
