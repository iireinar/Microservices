
package br.com.noface.entities.geral;

import br.com.noface.entities.DBModel;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;


/**
 * @author ranierigeroldi@gmail.com
 */
@Entity
public class UnidadeFederativa extends DBModel {

    private static final long serialVersionUID = -8266331321053339445L;
    
    @ManyToOne( fetch = FetchType.LAZY )
    private Pais pais; 
    private String codigo;
    private String nome;

    
    public Pais getPais() { return pais; }
    public void setPais(Pais pais){this.pais=pais;}
    
    public String getCodigo() {return codigo;}
    public void setCodigo(String codigo) {this.codigo = codigo;}
    
    public String getNome() {return nome;}
    public void setNome(String nome) {this.nome = nome;}

}
