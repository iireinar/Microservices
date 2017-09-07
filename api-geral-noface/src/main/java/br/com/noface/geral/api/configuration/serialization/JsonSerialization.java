
package br.com.noface.geral.api.configuration.serialization;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;


/**
 * @author ranierigeroldi@gmail.com
 */
@SuppressWarnings("unchecked")
@Configuration
public class JsonSerialization {

    @Bean
    public Jackson2ObjectMapperBuilder configureObjectMapper() {
        Jackson2ObjectMapperBuilder mapper = new Jackson2ObjectMapperBuilder().modulesToInstall( Hibernate5Module.class );
        mapper.serializationInclusion(JsonInclude.Include.NON_EMPTY);
        mapper.deserializers(new StringJsonDeserializer());
        
        return mapper;
    }
    
}
