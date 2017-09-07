package br.com.noface.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;


/**
 * @author ranierigeroldi@gmail.com
 */
@MappedSuperclass
public abstract class DBModel implements Model {

    private static final long serialVersionUID = -7058908226781082331L;

    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    protected DBModel() { }

    protected DBModel(DBModel dbModel) {
        this.id = dbModel.id;
    }

    
    @Override
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    @JsonIgnore
    public boolean isPersisted() {
        return id != null;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DBModel)) {
            return false;
        }

        DBModel that = (DBModel) o;

        if (id != null ? !id.equals(that.id) : that.id != null) {
            return false;
        }

        return true;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : super.hashCode();
    }

    @Override
    public String toString() {
        return "DBModel{" + "id=" + id +'}';
    }
}