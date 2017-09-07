
package br.com.noface.load.balancer.controller.geral;

import br.com.noface.entities.geral.UnidadeFederativa;
import br.com.noface.load.balancer.service.geral.UnidadeFederativaService;
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
@RequestMapping( "/geral/unidade_federativa" )
public class UnidadeFederativaController extends BaseCrudController<UnidadeFederativa> {

    @RequestMapping(value = "/nome/{nome}", method = RequestMethod.GET)
    public List<UnidadeFederativa> byNome(@RequestHeader("Authorization") String token, @PathVariable String nome){
    	return this.getUnidadeFederativaService().byNome(token, nome);
    }
	
    
    private UnidadeFederativaService getUnidadeFederativaService() {return (UnidadeFederativaService)super.getBaseCrudService();}
	@Autowired
	public void setUnidadeFederativaService(UnidadeFederativaService unidadeFederativaService){super.setBaseCrudService(unidadeFederativaService);}
	
}


