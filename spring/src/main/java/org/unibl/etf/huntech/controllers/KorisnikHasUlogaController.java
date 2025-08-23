package org.unibl.etf.huntech.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.KorisnikHasUloga;
import org.unibl.etf.huntech.models.requests.KorisnikHasUlogaRequest;
import org.unibl.etf.huntech.services.KorisnikHasUlogaService;

import java.util.List;

@RestController
@RequestMapping("/korisnikhasulogas")
public class KorisnikHasUlogaController extends CrudController<Integer,
        KorisnikHasUlogaRequest, KorisnikHasUloga> {

    private final KorisnikHasUlogaService korisnikHasUlogaService;

    public KorisnikHasUlogaController(KorisnikHasUlogaService korisnikHasUlogaService){
        super(korisnikHasUlogaService, KorisnikHasUloga.class);
        this.korisnikHasUlogaService = korisnikHasUlogaService;
    }

    @GetMapping("/idKorisnika/{idKorisnika}")
    public ResponseEntity<List<KorisnikHasUloga>> getKorisnikHasUlogaByIdKorisnika(@PathVariable Integer idKorisnika){
        List<KorisnikHasUloga> khus = korisnikHasUlogaService.getKorisnikHasUlogaByIdKorisnika(idKorisnika);

        if (khus.isEmpty()) {
            return ResponseEntity.notFound().build(); // 404
        }

        return ResponseEntity.ok(khus); // 200 + lista
    }


}
