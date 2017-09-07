
package br.com.noface.load.balancer.service.geral;

import br.com.noface.entities.geral.Pais;
import java.util.List;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


/**
 * @author ranierigeroldi@gmail.com
 */
@FeignClient(name="api-geral-noface", path="pais")
public interface PaisService extends BaseCrudService<Pais> {

    @RequestMapping(value = "/nome/{nome}", method = RequestMethod.GET)
    List<Pais> byNome(@RequestHeader("Authorization") String token, @PathVariable("nome") String nome);

}
