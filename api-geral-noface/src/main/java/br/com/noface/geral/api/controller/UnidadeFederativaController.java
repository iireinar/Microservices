
package br.com.noface.geral.api.controller;

import br.com.noface.entities.geral.UnidadeFederativa;
import br.com.noface.geral.api.configuration.exception.BadRequest;
import br.com.noface.geral.api.repository.PaisRepository;
import br.com.noface.geral.api.repository.UnidadeFederativaRepository;
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
@RequestMapping( "/unidade_federativa" )
public class UnidadeFederativaController extends BaseController<UnidadeFederativa>{

    private PaisRepository paisRepository;
    
    
    @Override
    protected boolean isValidFindByExample(UnidadeFederativa entity) {
        return entity.getCodigo()!=null || entity.getNome()!=null || entity.getPais() != null;
    }

    @Override
    protected UnidadeFederativa defaultFindOne(Long id) {
        return this.getUnidadeFederativaRepository().findOneByIdWithPais(id);
    }

    @Override
    protected void afterPersist(UnidadeFederativa entity) {
        super.afterPersist(entity);
        
        entity.setPais(this.paisRepository.findOne(entity.getPais().getId()));
    }
    
    @RequestMapping(value = "/nome/{nome}", method = RequestMethod.GET)
    public List<UnidadeFederativa> byNome(@PathVariable String nome){
        if (nome==null||nome.trim().length()==0) throw new BadRequest("Invalid name.");
            
        return this.getUnidadeFederativaRepository().findByNomeContainingWithPaisOrderByNome(nome);
    }
    
    @Override
    protected List<UnidadeFederativa> defaultFindExample(UnidadeFederativa entity) {
        Long idPais = null;
        
        if(entity.getPais()!=null) idPais=entity.getPais().getId();
        
        return this.getUnidadeFederativaRepository().findByExample(entity.getCodigo(), entity.getNome(), idPais);
    }
    
    private UnidadeFederativaRepository getUnidadeFederativaRepository() {return ( UnidadeFederativaRepository ) this.getRepository();}
    @Autowired
    public void setUnidadeFederativaRepository( UnidadeFederativaRepository unidadeFederativaRepository ) {this.setRepository(unidadeFederativaRepository);}

    @Autowired
    public void setPaisRepository( PaisRepository paisRepository) {this.paisRepository=paisRepository;}

}