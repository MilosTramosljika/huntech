package org.unibl.etf.huntech.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.KHasZzp;
import org.unibl.etf.huntech.models.Komentar;
import org.unibl.etf.huntech.models.PinNaMapi;
import org.unibl.etf.huntech.models.SlikaZaObjavu;
import org.unibl.etf.huntech.models.entities.KomentarEntity;
import org.unibl.etf.huntech.models.requests.KHasZzpRequest;
import org.unibl.etf.huntech.models.requests.KomentarRequest;
import org.unibl.etf.huntech.services.KomentarService;
import org.unibl.etf.huntech.services.ObjavaService;

import java.util.List;


@RestController
@RequestMapping("/komentars")
public class KomentarController extends CrudController<Integer, KomentarRequest, Komentar> {

    private final KomentarService komentarService;
    private final ObjavaService objavaService;

    public KomentarController(KomentarService komentarService, ObjavaService objavaService) {

        super(komentarService, Komentar.class);
        this.komentarService = komentarService;
        this.objavaService = objavaService;
    }



    @GetMapping("/objava/{idObjave}")
    public ResponseEntity<List<Komentar>> getKomentarByObjavaId(@PathVariable Integer idObjave){
        if (!objavaService.existsById(idObjave)) {
            return ResponseEntity.notFound().build(); // 404 ako grupa ne postoji
        }

        List<Komentar> komentari = komentarService.getKomentarByObjavaId(idObjave);
        return ResponseEntity.ok(komentari); // 200 i [] ako nema objava
    }
}