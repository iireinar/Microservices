
package br.com.noface.load.balancer.controller.geral;

import br.com.noface.entities.DBModel;
import br.com.noface.load.balancer.service.geral.BaseCrudService;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


/**
 * @author ranierigeroldi@gmail.com
 */
public abstract class BaseCrudController<T extends DBModel> {

	private BaseCrudService<T> baseCrudService;
    
	
    @RequestMapping(method = RequestMethod.PUT)
    public T insert(@RequestHeader("Authorization") String token, @RequestBody T entity) {
    	return this.baseCrudService.insert(token, entity);
    }

    @RequestMapping(method = RequestMethod.POST)
    public T update(@RequestHeader("Authorization") String token, @RequestBody T entity) {
    	return this.baseCrudService.update(token, entity);
    }
    
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public T findOne(@RequestHeader("Authorization") String token, @PathVariable Long id){
    	return this.baseCrudService.findOne(token, id);
    }

    @RequestMapping(value = "/find", method = RequestMethod.POST)
    public List<T> findExample(@RequestHeader("Authorization") String token, @RequestBody T entity){
    	return this.baseCrudService.findExample(token, entity);
    }
    
    @RequestMapping(method = RequestMethod.DELETE)
    public T delete(@RequestHeader("Authorization") String token, @RequestBody T entity){
    	return this.baseCrudService.delete(token, entity);
    }
    
    
    protected void setBaseCrudService(BaseCrudService<T> baseCrudService){this.baseCrudService=baseCrudService;}
    protected BaseCrudService<T> getBaseCrudService() { return this.baseCrudService; }
    
}