package org.unibl.etf.huntech.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.Dogadjaj;
import org.unibl.etf.huntech.models.ZonaLova;
import org.unibl.etf.huntech.models.requests.DogadjajRequest;
import org.unibl.etf.huntech.models.requests.ZonaLovaRequest;
import org.unibl.etf.huntech.services.DogadjajService;
import org.unibl.etf.huntech.services.GrupaService;
import org.unibl.etf.huntech.services.ObjavaNaLovackiDnevnikService;
import org.unibl.etf.huntech.services.ZonaLovaService;

import java.util.List;

@RestController
@RequestMapping("/zonas-lova")
public class ZonaLovaController extends CrudController<Integer, ZonaLovaRequest, ZonaLova> {
    private final ZonaLovaService service;
    private final GrupaService grupaService;

    public ZonaLovaController(ZonaLovaService service, GrupaService grupaService) {
        super(service, ZonaLova.class);
        this.service = service;
        this.grupaService = grupaService;
    }

    @GetMapping("/grupa/{grupaId}")
    public ResponseEntity<List<ZonaLova>> getZonaLovaByIdGrupe(@PathVariable Integer grupaId) {
        if (!grupaService.existsById(grupaId)) {
            return ResponseEntity.notFound().build(); // 404 ako objava ne postoji
        }

        List<ZonaLova> zoneLova = service.getZonaLovaByIdGrupe(grupaId);
        return ResponseEntity.ok(zoneLova); // 200 i [] ako nema dogadjaja
    }
}
