
package br.com.noface.load.balancer.controller.geral;

import br.com.noface.entities.geral.Pais;
import br.com.noface.load.balancer.service.geral.PaisService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author ranierigeroldi@gmail.com
 */
@RestController
@RequestMapping( "/geral/pais" )
public class PaisController extends BaseCrudController<Pais> {

    @RequestMapping(value = "/nome/{nome}", method = RequestMethod.GET)
    public List<Pais> byNome(@RequestHeader("Authorization") String token, @PathVariable String nome){
    	return this.getPaisService().byNome(token, nome);
    }
	
    
    private PaisService getPaisService() {return (PaisService)super.getBaseCrudService();}
	@Autowired
	public void setPaisService(PaisService paisService){super.setBaseCrudService(paisService);}
	
}


