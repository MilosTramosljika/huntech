package org.unibl.etf.huntech.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.KorisnikHasGrupa;
import org.unibl.etf.huntech.models.KorisnikHasUloga;
import org.unibl.etf.huntech.models.Objava;
import org.unibl.etf.huntech.models.requests.KorisnikHasGrupaRequest;
import org.unibl.etf.huntech.services.KorisnikHasGrupaService;
import org.unibl.etf.huntech.services.KorisnikHasUlogaService;
import org.unibl.etf.huntech.services.KorisnikService;

import java.util.List;


@RestController
@RequestMapping("korisnik-grupas")
public class KorisnikHasGrupaController extends CrudController<Integer, KorisnikHasGrupaRequest, KorisnikHasGrupa> {

    private final KorisnikHasGrupaService korisnikHasGrupaService;
    private final KorisnikService korisnikService;

    public KorisnikHasGrupaController(KorisnikHasGrupaService korisnikHasGrupaService, KorisnikService korisnikService) {
        super(korisnikHasGrupaService, KorisnikHasGrupa.class);
        this.korisnikHasGrupaService = korisnikHasGrupaService;
        this.korisnikService = korisnikService;
    }

    @GetMapping("/idKorisnika/{idKorisnika}")
    public ResponseEntity<List<KorisnikHasGrupa>> getKorisnikHasGrupaByIdKorisnika(@PathVariable Integer idKorisnika){
        if (!korisnikService.existsById(idKorisnika)) {
            return ResponseEntity.notFound().build();
        }

        List<KorisnikHasGrupa> objave = korisnikHasGrupaService.getKorisnikHasGrupaByIdKorisnika(idKorisnika);
        return ResponseEntity.ok(objave);
    }
}
