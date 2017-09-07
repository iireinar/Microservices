package br.com.noface.geral.api.configuration;


import com.planetj.servlet.filter.compression.CompressingFilter;
import javax.servlet.Filter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.filter.ShallowEtagHeaderFilter;


/**
 * @author ranierigeroldi@gmail.com
 */
@Configuration
public class AppFilters {

    @Bean
    public Filter compressingFilter() {
        return new CompressingFilter();
    }

    @Bean
    public Filter etagFilter() { return new ShallowEtagHeaderFilter(); }

    @Bean
    public Filter utf8Filter() {
        CharacterEncodingFilter filter = new CharacterEncodingFilter();
        filter.setEncoding( "UTF-8" );
        filter.setForceEncoding( true );

        return filter;
    }

}
