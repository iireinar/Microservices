package br.com.noface.sso.repository;

import br.com.noface.sso.entity.Session;
import br.com.noface.sso.entity.ValidateToken;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

/**
 * @author ranierigeroldi@gmail.com
 */
@Repository
public class SessionRepository {

    private Map<String,Session> sessions;
    private RestTemplate restTemplate;
    @Value("${br.com.noface.sso.repository.SessionRepository.validate.token.url}")
    private String validateTokenUrl;
    
    
    {
        this.sessions=new HashMap<>();
    }
    
    
    public Session validateToken(String token){
        if(this.sessions.containsKey(token)) return this.sessions.get(token);
        
        try{
            Session session = this.restTemplate.postForObject(this.validateTokenUrl,this.generateValidationToken(token),Session.class);
        
            this.sessions.put(session.getToken(), session);
            
            return session;
        } catch ( HttpClientErrorException e ) {
            return null;
        }        
    }
    
    private ValidateToken generateValidationToken(String token) {
        return new ValidateToken(token);
    }
    
    @Autowired
    public void setRestTemplate(RestTemplate restTemplate){this.restTemplate=restTemplate;}
    
}
