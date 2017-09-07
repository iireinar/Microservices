
package br.com.noface.entities.geral;

import br.com.noface.entities.DBModel;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;


/**
 * @author ranierigeroldi@gmail.com
 */
@Entity
public class Municipio extends DBModel {

    private static final long serialVersionUID = -9000601993106450569L;
    
    @ManyToOne( fetch = FetchType.LAZY )
    private UnidadeFederativa unidadeFederativa; 
    private String nome;

    
    public UnidadeFederativa getUnidadeFederativa() { return unidadeFederativa; }
    public void setUnidadeFederativa(UnidadeFederativa unidadeFederativa){this.unidadeFederativa=unidadeFederativa;}
    
    public String getNome() {return nome;}
    public void setNome(String nome) {this.nome = nome;}

}
