package org.unibl.etf.huntech.advices;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


/**
 *
 * Ova klasa sluzi za povezivanje sa frontom
 * Neka bude za sad tu
 */

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // OVO JE MJESTO gdje postoji metoda addMapping(String)
                registry.addMapping("/**")
                        .allowedOrigins("*") // ili specificirani frontend npr. "http://localhost:3000"
                        .allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }
}
