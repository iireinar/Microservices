
package br.com.noface.geral.api.controller;

import br.com.noface.entities.geral.Municipio;
import br.com.noface.geral.api.repository.MunicipioRepository;
import br.com.noface.geral.api.repository.UnidadeFederativaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * @author ranierigeroldi@gmail.com
 */
@RestController
@RequestMapping( "/municipio" )
public class MunicipioController extends BaseController<Municipio>{

    private UnidadeFederativaRepository unidadeFederativaRepository;
    
    @Override
    protected boolean isValidFindByExample(Municipio entity) {
        return entity.getNome()!=null || entity.getUnidadeFederativa()!=null;
    }

    @Override
    protected Municipio defaultFindOne(Long id) {
        return this.getMunicipioRepository().findOneByIdWithUnidadeFederativaAndPais(id);
    }

    @Override
    protected void afterPersist(Municipio entity) {
        super.afterPersist(entity);
        
        entity.setUnidadeFederativa(this.unidadeFederativaRepository.findOneByIdWithPais(entity.getUnidadeFederativa().getId()));
    }
    
    @Override
    protected List<Municipio> defaultFindExample(Municipio entity) {
        Long idUnidadeFederativa = null;
        
        if(entity.getUnidadeFederativa()!=null) idUnidadeFederativa=entity.getUnidadeFederativa().getId();
        
        return this.getMunicipioRepository().findByExample(entity.getNome(), idUnidadeFederativa);
    }
    
    
    private MunicipioRepository getMunicipioRepository() {return ( MunicipioRepository ) this.getRepository();}
    @Autowired
    public void setMunicipioRepository( MunicipioRepository municipioRepository ) {this.setRepository(municipioRepository);}

    @Autowired
    public void setUnidadeFederativaRepository( UnidadeFederativaRepository unidadeFederativaRepository ) {this.unidadeFederativaRepository=unidadeFederativaRepository;}

}