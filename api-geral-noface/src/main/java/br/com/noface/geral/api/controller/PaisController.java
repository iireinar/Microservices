
package br.com.noface.geral.api.controller;

import br.com.noface.entities.geral.Pais;
import br.com.noface.geral.api.configuration.exception.BadRequest;
import br.com.noface.geral.api.repository.PaisRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


/**
 * @author ranierigeroldi@gmail.com
 */
@RestController
@RequestMapping( "/pais" )
public class PaisController extends BaseController<Pais>{

    @Override
    protected boolean isValidFindByExample(Pais entity) {
        return entity.getCodigo()!=null || entity.getNome()!=null;
    }

    @RequestMapping(value = "/nome/{nome}", method = RequestMethod.GET)
    public List<Pais> byNome(@PathVariable String nome){
        if (nome==null||nome.trim().length()==0) throw new BadRequest("Invalid name.");
        
        return this.getPaisRepository().findByNomeContainingOrderByNome(nome);
    }

    private PaisRepository getPaisRepository() {return (PaisRepository)super.getRepository();}
    @Autowired
    public void setPaisRepository( PaisRepository paisRepository ) {this.setRepository(paisRepository);}

}