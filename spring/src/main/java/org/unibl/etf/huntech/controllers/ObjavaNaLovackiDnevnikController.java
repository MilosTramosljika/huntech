package org.unibl.etf.huntech.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.Dogadjaj;
import org.unibl.etf.huntech.models.ObjavaNaLovackiDnevnik;
import org.unibl.etf.huntech.models.entities.DogadjajEntity;
import org.unibl.etf.huntech.models.entities.ObjavaNaLovackiDnevnikEntity;
import org.unibl.etf.huntech.models.requests.ObjavaNaLovackiDnevnikRequest;
import org.unibl.etf.huntech.services.KorisnikService;
import org.unibl.etf.huntech.services.ObjavaNaLovackiDnevnikService;

import java.util.List;

@RestController
@RequestMapping("/objavas-ld")
public class ObjavaNaLovackiDnevnikController extends CrudController<Integer,
        ObjavaNaLovackiDnevnikRequest, ObjavaNaLovackiDnevnik> {

    private final ObjavaNaLovackiDnevnikService service;
    private final KorisnikService korisnikService;

    public ObjavaNaLovackiDnevnikController(ObjavaNaLovackiDnevnikService service, KorisnikService korisnikService) {
        super(service, ObjavaNaLovackiDnevnik.class);
        this.service = service;
        this.korisnikService = korisnikService;
    }


    @GetMapping("/korisnik/{korisnikId}")
    public ResponseEntity<List<ObjavaNaLovackiDnevnik>> getObjaveNaLovackomDnevnikuByIdKorisnika(@PathVariable Integer korisnikId) {
        if (!korisnikService.existsById(korisnikId)) {
            return ResponseEntity.notFound().build(); // 404 ako objava ne postoji
        }

        List<ObjavaNaLovackiDnevnik> dogadjaji = service.getObjaveNaLovackomDnevnikuByKorisnikId(korisnikId);
        return ResponseEntity.ok(dogadjaji); // 200 i [] ako nema dogadjaja
    }
}
