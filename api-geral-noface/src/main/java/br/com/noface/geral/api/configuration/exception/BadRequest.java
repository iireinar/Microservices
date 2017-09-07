
package br.com.noface.geral.api.configuration.exception;


/**
 * @author ranierigeroldi@gmail.com
 */
public class BadRequest extends RuntimeException {
    
    private static final long serialVersionUID = 2119335586289852450L;
    

    public BadRequest(String message){
        super(message);
    }
    
}
