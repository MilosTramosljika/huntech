package org.unibl.etf.huntech;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


//@OpenAPIDefinition(
//        info = @Info(
//                title = "Huntech API",
//                version = "1.0.0",
//                description = "Opis aplikacije"
//        )
//)

@SpringBootApplication
public class HuntechApplication {

    public static void main(String[] args) {
        SpringApplication.run(HuntechApplication.class, args);
    }

    @Bean
    ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setAmbiguityIgnored(true);
        return mapper;
    }

    /*
    @Bean
    public Docket api() {

        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build().apiInfo(getApiInfo());
    }

    private ApiInfo getApiInfo() {
        return new ApiInfo("Huntech", "Description of our application", "1.0.0",
                "", null, "", "", new ArrayList<>());
    }
     */
}
