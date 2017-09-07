
package br.com.noface.load.balancer.controller.geral;

import br.com.noface.entities.geral.Municipio;
import br.com.noface.load.balancer.service.geral.MunicipioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * @author ranierigeroldi@gmail.com
 */
@RestController
@RequestMapping( "/geral/municipio" )
public class MunicipioController extends BaseCrudController<Municipio> {

	@Autowired
	public void setMunicipioService(MunicipioService municipioService){super.setBaseCrudService(municipioService);}
	
}


