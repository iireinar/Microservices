package br.com.noface.sso.entity;


/**
 * @author ranierigeroldi@gmail.com
 */
public class ValidateToken {

    private String token;

    
    public ValidateToken(String token) {
        this.token=token;
    }
    
    public String getToken() {return token;}
    public void setToken(String token) {this.token = token;}
    
}
