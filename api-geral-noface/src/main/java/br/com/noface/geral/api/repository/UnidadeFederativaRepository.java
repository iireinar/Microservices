
package br.com.noface.geral.api.repository;

import br.com.noface.entities.geral.UnidadeFederativa;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


/**
 * @author ranierigeroldi@gmail.com
 */
@Repository
public interface UnidadeFederativaRepository extends JpaRepository<UnidadeFederativa,Long> {
    
    @Query( "select    unfe " +
            "from      UnidadeFederativa as unfe " +
            "left join fetch unfe.pais as pais " +
            "where unfe.id = ?1 " )
    UnidadeFederativa findOneByIdWithPais(Long id);

    @Query( "select    unfe " +
            "from      UnidadeFederativa as unfe " +
            "left join fetch unfe.pais as pais " +
            "where (unfe.codigo like %?1% or ?1 is null) " +
            "and   (unfe.nome like %?2% or ?2 is null) " +
            "and   (unfe.pais.id = ?3 or ?3 is null) " +
            "order by unfe.nome " )
    List<UnidadeFederativa> findByExample(String codigo, String nome, Long idPais);

    @Query( "select    unfe " +
            "from      UnidadeFederativa as unfe " +
            "left join fetch unfe.pais as pais " +
            "where   (unfe.nome like %?1% or ?1 is null) " +
            "order by unfe.nome " )
    List<UnidadeFederativa> findByNomeContainingWithPaisOrderByNome(String nome);
    
}
