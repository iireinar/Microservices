
package br.com.noface.geral.api.controller;


import br.com.noface.entities.DBModel;
import br.com.noface.geral.api.configuration.exception.BadRequest;
import java.util.Collections;
import java.util.List;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


/**
 * @author ranierigeroldi@gmail.com
 */
public abstract class BaseController<T extends DBModel> {

    private static final String INVALID_ID_MESSAGE = "Invalid id.";
    private static final String INVALID_ENTITY_MESSAGE = "Invalid entity.";
    
    private JpaRepository<T, Long> repository;

    
    @RequestMapping(method = RequestMethod.PUT)
    public T insert(@RequestBody T entity) {
        if(entity==null) throw new BadRequest(INVALID_ENTITY_MESSAGE);

        T persistedEntity = this.repository.save(entity);
        
        this.afterPersist(persistedEntity);
        
        return persistedEntity;
    }

    @RequestMapping(method = RequestMethod.POST)
    public T update(@RequestBody T entity) {
        if(entity==null || entity.getId()==null) throw new BadRequest(INVALID_ID_MESSAGE);

        T persistedEntity = this.repository.save(entity);
        
        this.afterPersist(persistedEntity);
        
        return persistedEntity;
    }
    
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public T findOne(@PathVariable Long id){
        if (id==null) throw new BadRequest(INVALID_ID_MESSAGE);
        
        T entity = this.defaultFindOne(id); 
        
        if (entity == null || entity.getId()==null) throw new BadRequest(INVALID_ID_MESSAGE);
        
        return entity;
    }

    protected void afterPersist(T entity){}
    
    protected T defaultFindOne(Long id) {
        return this.repository.findOne(id);
    }
    
    protected List<T> defaultFindExample(T entity){
        return this.repository.findAll(Example.of(entity, ExampleMatcher.matchingAll()
                                              .withIgnoreNullValues()
                                              .withIgnoreCase()
                                              .withStringMatcher(StringMatcher.CONTAINING)));
        
    }
    
    protected abstract boolean isValidFindByExample(T entity);
    
    @RequestMapping(value = "/find", method = RequestMethod.POST)
    public List<T> findExample(@RequestBody T entity){
        if (!this.isValidFindByExample(entity)) return Collections.emptyList();
        
        return this.defaultFindExample(entity);
    }
    
    @RequestMapping(method = RequestMethod.DELETE)
    public T delete(@RequestBody T entity){
        if (entity.getId()==null) throw new BadRequest(INVALID_ID_MESSAGE);
        
        this.repository.delete(entity);
        
        return entity;
    }

    protected JpaRepository<T,Long> getRepository() {return this.repository;}
    protected void setRepository(JpaRepository<T,Long> repository) {this.repository = repository;}
    
}