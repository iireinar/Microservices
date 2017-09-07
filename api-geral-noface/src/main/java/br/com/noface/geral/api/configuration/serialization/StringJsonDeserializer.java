package br.com.noface.geral.api.configuration.serialization;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;


/**
 * @author ranierigeroldi@gmail.com
 */
public class StringJsonDeserializer extends JsonDeserializer<String> {

    @Override
    public String deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        String value = p.getValueAsString();
        
        if ( value != null && ! value.isEmpty() ) return value;
                
        return null;
    }

    @Override
    public Class<?> handledType() {
        return String.class;
    }
    
}