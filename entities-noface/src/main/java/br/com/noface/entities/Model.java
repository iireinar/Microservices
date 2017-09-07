
package br.com.noface.entities;

import java.io.Serializable;


/**
 * @author ranierigeroldi@gmail.com
 */
public interface Model  extends Serializable {

    public Long getId();

    boolean isPersisted();

}
