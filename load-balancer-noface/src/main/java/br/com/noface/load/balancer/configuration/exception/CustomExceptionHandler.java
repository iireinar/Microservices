
package br.com.noface.load.balancer.configuration.exception;

import com.netflix.hystrix.exception.HystrixRuntimeException;
import feign.FeignException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


/**
 * @author ranierigeroldi@gmail.com
 */
@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

	private static final String ERROR_CONTENT = "content:";
	private static final int ERROR_CONTENT_LENGTH = ERROR_CONTENT.length();
	
	private ResponseEntity<Object> handleFeignException(FeignException e, WebRequest request) {
    	String errMessage = e.getMessage();
    	
    	if(errMessage.contains(ERROR_CONTENT)){
    		errMessage = errMessage.substring(errMessage.indexOf(ERROR_CONTENT)+ERROR_CONTENT_LENGTH).trim();
    	}

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        return handleExceptionInternal(e, errMessage, headers, HttpStatus.valueOf(e.status()), request);
	}
	@ExceptionHandler( { HystrixRuntimeException.class } )
	protected ResponseEntity<Object> handleException(HystrixRuntimeException e, WebRequest request) {
		if(e.getCause() instanceof FeignException) {
			return this.handleFeignException((FeignException)e.getCause(), request);
		}
		
		return this.handleException(e, request);
	}
	
    @ExceptionHandler( { FeignException.class } )
    protected ResponseEntity<Object> handleException(FeignException e, WebRequest request) {
    	return this.handleFeignException(e, request);
    }

    @ExceptionHandler( { Exception.class } )
    protected ResponseEntity<Object> handleException(RuntimeException e, WebRequest request) {
        ErrorResource error = new ErrorResource("InternalServerError", e.getMessage());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        return handleExceptionInternal(e, error, headers, HttpStatus.INTERNAL_SERVER_ERROR, request);
    }
    
}
