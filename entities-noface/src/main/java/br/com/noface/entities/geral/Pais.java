
package br.com.noface.entities.geral;


import br.com.noface.entities.DBModel;
import javax.persistence.Entity;


/**
 * @author ranierigeroldi@gmail.com
 */
@Entity
public class Pais extends DBModel {

    private static final long serialVersionUID = -6798508882421205106L;

    private String codigo;
    private String nome;
    
    public String getCodigo() {return codigo;}
    public void setCodigo(String codigo) {this.codigo = codigo;}
    
    public String getNome() {return nome;}
    public void setNome(String nome) {this.nome = nome;}

}
