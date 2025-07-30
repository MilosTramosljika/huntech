package org.unibl.etf.huntech.controllers;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.Korisnik;
import org.unibl.etf.huntech.models.requests.KorisnikRequest;
import org.unibl.etf.huntech.services.KorisnikService;

import java.nio.file.Files;
import java.nio.file.Paths;


@RestController
@RequestMapping("/korisniks")
public class KorisnikController extends CrudController<Integer, KorisnikRequest, Korisnik> {

    private final KorisnikService service;

    public KorisnikController(KorisnikService service) {
        super(service, Korisnik.class);
        this.service = service;
    }


    @PostMapping("/{id}/upload-profilna")
    public ResponseEntity<String> uploadProfilnaSlika(@PathVariable Integer id,
                                                      @RequestParam("slika") MultipartFile slika) {
        try {
            String nazivFajla = service.uploadProfilnaSlika(id, slika);
            return ResponseEntity.ok("Uspješno sačuvana slika: " + nazivFajla);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Greška: " + e.getMessage());
        }
    }

    @GetMapping("/profilna/{fileName:.+}")
    public ResponseEntity<Resource> getProfilnaSlika(@PathVariable String fileName) {
        try {
            Resource resource = service.getProfilnaSlikaResource(fileName);

            String mimeType = Files.probeContentType(Paths.get(resource.getURI()));
            MediaType mediaType = mimeType != null ? MediaType.parseMediaType(mimeType) : MediaType.APPLICATION_OCTET_STREAM;

            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .body(resource);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    /*
    @PostMapping("/{id}/upload-profilna")
    public ResponseEntity<String> uploadProfilnaSlika(@PathVariable Integer id,
                                                      @RequestParam("file") MultipartFile file) {
        try {
            String uploadDir = "uploads/";
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Files.copy(file.getInputStream(), uploadPath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

            // Ažuriranje korisnika
            Korisnik korisnik = ((KorisnikService) korisnikService).findById(id);
            if (korisnik == null) {
                return ResponseEntity.notFound().build();
            }

            korisnik.setProfilnaSlika(fileName);
            ((KorisnikService) korisnikService).update(id, korisnik, Korisnik.class);

            return ResponseEntity.ok("Profilna slika postavljena: " + fileName);

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Greška pri uploadu slike.");
        }
    }
    */

}


//swagger uzima endpointe i pravi dokumentaciju na osnovu njih
