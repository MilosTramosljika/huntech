package org.unibl.etf.huntech.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.Objava;
import org.unibl.etf.huntech.models.PinNaMapi;
import org.unibl.etf.huntech.models.SlikaZaObjavu;
import org.unibl.etf.huntech.models.requests.SlikaZaObjavuRequest;
import org.unibl.etf.huntech.services.ObjavaService;
import org.unibl.etf.huntech.services.SlikaZaObjavuService;

import java.util.List;


@RestController
@RequestMapping("/slikas")
public class SlikaZaObjavuController extends CrudController<Integer, SlikaZaObjavuRequest, SlikaZaObjavu> {

    private final SlikaZaObjavuService slikaZaObjavuService;
    private final ObjavaService objavaService;


    public SlikaZaObjavuController(SlikaZaObjavuService slikaZaObjavuService, ObjavaService objavaService) {
        super(slikaZaObjavuService, SlikaZaObjavu.class);
        this.slikaZaObjavuService=slikaZaObjavuService;
        this.objavaService=objavaService;
    }

    @GetMapping("/objava/{idObjave}")
    public ResponseEntity<List<SlikaZaObjavu>> getSlikaZaObjavuByObjavaId(@PathVariable Integer idObjave){
        if (!objavaService.existsById(idObjave)) {
            return ResponseEntity.notFound().build(); // 404 ako grupa ne postoji
        }

        List<SlikaZaObjavu> slikeZaObjavu = slikaZaObjavuService.getSlikaZaObjavuByObjavaId(idObjave);
        return ResponseEntity.ok(slikeZaObjavu); // 200 i [] ako nema objava
    }
}
