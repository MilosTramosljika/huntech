package org.unibl.etf.huntech.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.ObjavaNaLovackiDnevnik;
import org.unibl.etf.huntech.models.PinNaMapi;
import org.unibl.etf.huntech.models.requests.ObjavaNaLovackiDnevnikRequest;
import org.unibl.etf.huntech.models.requests.PinNaMapiRequest;
import org.unibl.etf.huntech.services.ObjavaNaLovackiDnevnikService;
import org.unibl.etf.huntech.services.PinNaMapiService;

import java.util.List;

@RestController
@RequestMapping("/pins-na-mapi")
public class PinNaMapiController extends CrudController<Integer, PinNaMapiRequest, PinNaMapi> {
    private final PinNaMapiService service;

    public PinNaMapiController(PinNaMapiService service) {
        super(service, PinNaMapi.class);
        this.service = service;
    }


    @GetMapping("/grupa/{idGrupe}")
    public ResponseEntity<List<PinNaMapi>> getPinNaMapiByIdGrupe(@PathVariable Integer idGrupe) {
        List<PinNaMapi> pinovi = service.getPinNaMapiByGrupaId(idGrupe);

        if (pinovi.isEmpty()) {
            return ResponseEntity.notFound().build(); // 404
        }

        return ResponseEntity.ok(pinovi); // 200 + lista
    }
}
