
package br.com.noface.geral.api.repository;

import br.com.noface.entities.geral.Pais;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * @author ranierigeroldi@gmail.com
 */
@Repository
public interface PaisRepository extends JpaRepository<Pais,Long> {

    List<Pais> findByNomeContainingOrderByNome(String nome);
    
}
