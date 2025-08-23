package org.unibl.etf.huntech.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.Objava;
import org.unibl.etf.huntech.models.ObjavaNaLovackiDnevnik;
import org.unibl.etf.huntech.models.PinNaMapi;
import org.unibl.etf.huntech.models.requests.ObjavaNaLovackiDnevnikRequest;
import org.unibl.etf.huntech.models.requests.PinNaMapiRequest;
import org.unibl.etf.huntech.services.GrupaService;
import org.unibl.etf.huntech.services.ObjavaNaLovackiDnevnikService;
import org.unibl.etf.huntech.services.PinNaMapiService;

import java.util.List;

@RestController
@RequestMapping("/pins-na-mapi")
public class PinNaMapiController extends CrudController<Integer, PinNaMapiRequest, PinNaMapi> {
    private final PinNaMapiService service;
    private final GrupaService grupaService;

    public PinNaMapiController(PinNaMapiService service, GrupaService grupaService) {
        super(service, PinNaMapi.class);
        this.service = service;
        this.grupaService = grupaService;
    }


    @GetMapping("/grupa/{idGrupe}")
    public ResponseEntity<List<PinNaMapi>> getPinNaMapiByIdGrupe(@PathVariable Integer idGrupe) {
        List<PinNaMapi> pinovi = service.getPinNaMapiByGrupaId(idGrupe);

        if (!grupaService.existsById(idGrupe)) {
            return ResponseEntity.notFound().build(); // 404 ako grupa ne postoji
        }

        List<PinNaMapi> objave = service.getPinNaMapiByGrupaId(idGrupe);
        return ResponseEntity.ok(objave); // 200 i [] ako nema objava
    }
}
