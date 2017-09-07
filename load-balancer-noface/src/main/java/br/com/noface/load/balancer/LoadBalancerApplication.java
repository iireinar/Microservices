
package br.com.noface.load.balancer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;


/**
 * @author ranierigeroldi@gmail.com
 */
@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
@EnableAutoConfiguration(exclude = {org.springframework.boot.autoconfigure.security.SecurityAutoConfiguration.class,
                                    org.springframework.boot.actuate.autoconfigure.ManagementWebSecurityAutoConfiguration.class})
public class LoadBalancerApplication {

	public static void main(String[] args) {
        SpringApplication.run(LoadBalancerApplication.class, args);
	}
	
}
	