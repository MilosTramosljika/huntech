package org.unibl.etf.huntech.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.Objava;
import org.unibl.etf.huntech.models.requests.ObjavaRequest;
import org.unibl.etf.huntech.services.GrupaService;
import org.unibl.etf.huntech.services.ObjavaService;

import java.util.List;

@RestController
@RequestMapping("/objavas")
public class ObjavaController extends CrudController<Integer, ObjavaRequest, Objava> {
    private final ObjavaService objavaService;
    private final GrupaService grupaService;

    public ObjavaController(ObjavaService service, GrupaService grupaService) {
        super(service, Objava.class);
        this.objavaService = service;
        this.grupaService = grupaService;
    }

    @GetMapping("/grupa/{idGrupe}")
    public ResponseEntity<List<Objava>> getObjavaByGrupaId(@PathVariable Integer idGrupe){
        if (!grupaService.existsById(idGrupe)) {
            return ResponseEntity.notFound().build(); // 404 ako grupa ne postoji
        }

        List<Objava> objave = objavaService.getObjaveByGrupaId(idGrupe);
        return ResponseEntity.ok(objave); // 200 i [] ako nema objava
    }
}
