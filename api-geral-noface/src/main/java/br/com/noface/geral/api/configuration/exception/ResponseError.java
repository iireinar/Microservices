package br.com.noface.geral.api.configuration.exception;

import org.springframework.validation.Errors;

/**
 * @author ranierigeroldi@gmail.com
 */
public class ResponseError extends  RuntimeException {

    private static final long serialVersionUID = 2878907503652807743L;
    
    private Errors errors;


    public ResponseError(String message, Errors errors) {
        super( message );
        this.errors = errors;
    }


    public Errors getErrors() { return this.errors; }

}
