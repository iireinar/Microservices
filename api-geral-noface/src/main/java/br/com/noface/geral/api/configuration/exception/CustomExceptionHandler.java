package br.com.noface.geral.api.configuration.exception;

import java.util.ArrayList;
import java.util.List;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


/**
 * @author ranierigeroldi@gmail.com
 */
@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler( { ResponseError.class } )
    protected ResponseEntity<Object> handleResponseError(RuntimeException e, WebRequest request) {
        ResponseError ire = (ResponseError) e;
        List<FieldErrorResource> fieldErrorResources = new ArrayList<>();

        List<FieldError> fieldErrors = ire.getErrors().getFieldErrors();
        for (FieldError fieldError : fieldErrors) {
            FieldErrorResource fieldErrorResource = new FieldErrorResource();
            fieldErrorResource.setResource(fieldError.getObjectName());
            fieldErrorResource.setField(fieldError.getField());
            fieldErrorResource.setCode(fieldError.getCode());
            fieldErrorResource.setMessage(fieldError.getDefaultMessage());
            fieldErrorResources.add(fieldErrorResource);
        }

        ErrorResource error = new ErrorResource("InvalidRequest", ire.getMessage());
        error.setFieldErrors(fieldErrorResources);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        return handleExceptionInternal(e, error, headers, HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler( { BadRequest.class } )
    protected ResponseEntity<Object> handleException(BadRequest e, WebRequest request) {
        ErrorResource error = new ErrorResource("BadRequest", e.getMessage());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        return handleExceptionInternal(e, error, headers, HttpStatus.INTERNAL_SERVER_ERROR, request);
    }
    
    @ExceptionHandler( { DataIntegrityViolationException.class } )
    protected ResponseEntity<Object> handleException(DataIntegrityViolationException e, WebRequest request) {
        String code = "DataIntegrityViolationException";
        
        if ( e.getCause() instanceof ConstraintViolationException ) code = "ConstraintViolationException";
        
        ErrorResource error = new ErrorResource(code, e.getMessage());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        return handleExceptionInternal(e, error, headers, HttpStatus.INTERNAL_SERVER_ERROR, request);
    }

    @ExceptionHandler( { BadCredentialsException.class } )
    protected ResponseEntity<Object> handleBadCredentials(RuntimeException e, WebRequest request) {
        ErrorResource error = new ErrorResource( "BadCredentials", "Usuário/Senha inválido(s)." );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        return handleExceptionInternal(e, error, headers, HttpStatus.UNAUTHORIZED, request);
    }

    @ExceptionHandler( { Exception.class } )
    protected ResponseEntity<Object> handleException(RuntimeException e, WebRequest request) {
        ErrorResource error = new ErrorResource("InternalServerError", e.getMessage());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        return handleExceptionInternal(e, error, headers, HttpStatus.INTERNAL_SERVER_ERROR, request);
    }

    

}
