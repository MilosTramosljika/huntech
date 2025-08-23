package org.unibl.etf.huntech.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.Komentar;
import org.unibl.etf.huntech.models.PinNaMapi;
import org.unibl.etf.huntech.models.requests.PodkomentarRequest;
import org.unibl.etf.huntech.models.Podkomentar;
import org.unibl.etf.huntech.services.KomentarService;
import org.unibl.etf.huntech.services.PodkomentarService;

import java.util.List;

@RestController
@RequestMapping("/podkomentars")
public class PodkomentarController extends CrudController<Integer, PodkomentarRequest, Podkomentar> {

    private final PodkomentarService podkomentarService;
    private final KomentarService komentarService;

    public PodkomentarController(PodkomentarService podkomentarService, KomentarService komentarService) {
        super(podkomentarService, Podkomentar.class);
        this.podkomentarService = podkomentarService;
        this.komentarService = komentarService;
    }


    @GetMapping("/komentar/{idKomentara}")
    public ResponseEntity<List<Podkomentar>> getPodKomentarByKomentarId(@PathVariable Integer idKomentara){
        if (!komentarService.existsById(idKomentara)) {
            return ResponseEntity.notFound().build(); // 404 ako grupa ne postoji
        }

        List<Podkomentar> podkomentari = podkomentarService.getPodkomentarByKomentarId(idKomentara);
        return ResponseEntity.ok(podkomentari); // 200 i [] ako nema objava
    }
}