
package br.com.noface.load.balancer.service.geral;

import br.com.noface.entities.DBModel;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author ranierigeroldi@gmail.com
 */
public interface BaseCrudService<T extends DBModel> {

    @RequestMapping(method = RequestMethod.PUT)
    T insert(@RequestHeader("Authorization") String token, @RequestBody T entity);

    @RequestMapping(method = RequestMethod.POST)
    T update(@RequestHeader("Authorization") String token, @RequestBody T entity);
    
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    T findOne(@RequestHeader("Authorization") String token, @PathVariable("id") Long id);
    
    @RequestMapping(value = "/find", method = RequestMethod.POST)
    List<T> findExample(@RequestHeader("Authorization") String token, @RequestBody T entity);
    
    @RequestMapping(method = RequestMethod.DELETE)
    T delete(@RequestHeader("Authorization") String token, @RequestBody T entity);

}
