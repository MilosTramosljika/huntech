package org.unibl.etf.huntech.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.KorisnikHasGrupa;
import org.unibl.etf.huntech.models.KorisnikHasUloga;
import org.unibl.etf.huntech.models.requests.KorisnikHasUlogaRequest;
import org.unibl.etf.huntech.services.KorisnikHasUlogaService;
import org.unibl.etf.huntech.services.KorisnikService;

import java.util.List;

@RestController
@RequestMapping("/korisnikhasulogas")
public class KorisnikHasUlogaController extends CrudController<Integer,
        KorisnikHasUlogaRequest, KorisnikHasUloga> {

    private final KorisnikHasUlogaService korisnikHasUlogaService;
    private final KorisnikService korisnikService;

    public KorisnikHasUlogaController(KorisnikHasUlogaService korisnikHasUlogaService, KorisnikService korisnikService){
        super(korisnikHasUlogaService, KorisnikHasUloga.class);
        this.korisnikHasUlogaService = korisnikHasUlogaService;
        this.korisnikService = korisnikService;
    }

    @GetMapping("/idKorisnika/{idKorisnika}")
    public ResponseEntity<List<KorisnikHasUloga>> getKorisnikHasUlogaByIdKorisnika(@PathVariable Integer idKorisnika){
        if (!korisnikService.existsById(idKorisnika)) {
            return ResponseEntity.notFound().build();
        }

        List<KorisnikHasUloga> objave = korisnikHasUlogaService.getKorisnikHasUlogaByIdKorisnika(idKorisnika);
        return ResponseEntity.ok(objave);
    }
}
