
package br.com.noface.sso.service;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


/**
 * @author ranierigeroldi@gmail.com
 */
public class CustomUserDetailsService implements UserDetailsService {

    public static final String ROLE_ADMIN = "ADMIN";
    public static final String ROLE_USER = "USER";

    
    @SuppressWarnings("serial")
    static class SimpleUserDetails implements UserDetails {

        private String username;
        private String password;
        private boolean enabled = true;
        private Set<GrantedAuthority> authorities = new HashSet<GrantedAuthority>();

        public SimpleUserDetails(String username, String pw, String... roles) {
            this.username = username;
            this.password = pw;

            Arrays.stream(roles).forEach((role) -> {
                authorities.add(new SimpleGrantedAuthority(toRole(role)));
            } );
        }

        @Override
        public boolean isEnabled() { return this.enabled; }

        @Override
        public boolean isCredentialsNonExpired() { return this.enabled; }

        @Override
        public boolean isAccountNonLocked() { return this.enabled; }

        @Override
        public boolean isAccountNonExpired() { return this.enabled; }

        @Override
        public String getUsername() { return this.username; }

        @Override
        public String getPassword() { return this.password; }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() { return this.authorities; }
        
        private String toRole(String i) { return "ROLE_" + i; }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return new SimpleUserDetails(username, "defaultPassword", ROLE_USER);
    }

}
