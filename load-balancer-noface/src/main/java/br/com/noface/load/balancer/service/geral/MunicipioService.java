
package br.com.noface.load.balancer.service.geral;

import br.com.noface.entities.geral.Municipio;
import org.springframework.cloud.netflix.feign.FeignClient;


/**
 * @author ranierigeroldi@gmail.com
 */
@FeignClient(name="api-geral-noface", path="municipio")
public interface MunicipioService extends BaseCrudService<Municipio> {

}
