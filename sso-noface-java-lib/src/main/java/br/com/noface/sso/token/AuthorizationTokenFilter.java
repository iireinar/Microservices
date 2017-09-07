
package br.com.noface.sso.token;

import br.com.noface.sso.entity.Session;
import br.com.noface.sso.repository.SessionRepository;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.GenericFilterBean;


/**
 * @author ranierigeroldi@gmail.com
 */
public class AuthorizationTokenFilter extends GenericFilterBean {

    private UserDetailsService detailsService;
    private SessionRepository sessionRepository;
    private String authorizationTokenHeader = "Authorization";
    private String bearerPrefix = "Bearer";    

    
    public AuthorizationTokenFilter(UserDetailsService userDetailsService,SessionRepository sessionRepository) {
        this.detailsService=userDetailsService;
        this.sessionRepository=sessionRepository;
    }
    
    private String extractToken(String token){
        if(token!=null&&!token.trim().isEmpty()&&token.startsWith(this.bearerPrefix)){
            return token.replace(this.bearerPrefix, "").trim();
        }
        
        return null;
    }
    
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        try {
            HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
            String authToken = httpServletRequest.getHeader(this.authorizationTokenHeader);

            Session session;
            String token;

            if((token=this.extractToken(authToken))!=null
              && (session=this.sessionRepository.validateToken(token))!=null){

                UserDetails details = this.detailsService.loadUserByUsername(session.getUsername());
                
                UsernamePasswordAuthenticationToken user = new UsernamePasswordAuthenticationToken(details, details.getPassword(), details.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(user);
            }
            
            filterChain.doFilter(servletRequest, servletResponse);
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }

}