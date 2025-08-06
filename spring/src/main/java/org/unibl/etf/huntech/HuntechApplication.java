package org.unibl.etf.huntech;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.FileInputStream;
import java.io.IOException;


@OpenAPIDefinition(
        info = @Info(
                title = "Huntech API",
                version = "1.0.0",
                description = "Opis aplikacije"
        )
)

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

    @Bean
    public FirebaseApp initializeFirebase() throws IOException {
        FileInputStream serviceAccount =
                new FileInputStream("C:\\Users\\Korisnik\\" +
                        "Desktop\\huntech-b9a32-firebase-adminsdk-fbsvc-bb1fc08dea.json"); // Apsolutna ili relativna putanja

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        // Proveri da li je FirebaseApp već inicijalizovan
        if (FirebaseApp.getApps().isEmpty()) {
            return FirebaseApp.initializeApp(options);
        } else {
            return FirebaseApp.getInstance(); // Vrati postojeću instancu ako je već inicijalizovana
        }
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
