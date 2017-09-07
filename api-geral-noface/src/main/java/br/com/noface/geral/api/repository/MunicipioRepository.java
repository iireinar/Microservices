
package br.com.noface.geral.api.repository;

import br.com.noface.entities.geral.Municipio;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


/**
 * @author ranierigeroldi@gmail.com
 */
@Repository
public interface MunicipioRepository extends JpaRepository<Municipio,Long> {
    
    @Query( "select    muni " +
            "from      Municipio as muni " +
            "left join fetch muni.unidadeFederativa as unfe " +
            "left join fetch unfe.pais as pais " +
            "where muni.id = ?1 " )
    Municipio findOneByIdWithUnidadeFederativaAndPais(Long id);

    @Query( "select    muni " +
            "from      Municipio as muni " +
            "left join fetch muni.unidadeFederativa as unfe " +
            "left join fetch unfe.pais as pais " +
            "where  (muni.nome like %?1% or ?1 is null) " +
            "and    (muni.unidadeFederativa.id = ?2 or ?2 is null) " +
            "order by muni.nome " )
    List<Municipio> findByExample(String nome, Long idUnidadeFederativa);
    
}
