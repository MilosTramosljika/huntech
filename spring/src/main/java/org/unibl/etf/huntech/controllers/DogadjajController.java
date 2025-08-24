package org.unibl.etf.huntech.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.Dogadjaj;
import org.unibl.etf.huntech.models.Grupa;
import org.unibl.etf.huntech.models.Objava;
import org.unibl.etf.huntech.models.ObjavaNaLovackiDnevnik;
import org.unibl.etf.huntech.models.entities.DogadjajEntity;
import org.unibl.etf.huntech.models.requests.DogadjajRequest;
import org.unibl.etf.huntech.services.DogadjajService;
import org.unibl.etf.huntech.services.GrupaService;
import org.unibl.etf.huntech.services.ObjavaNaLovackiDnevnikService;
import org.unibl.etf.huntech.services.ObjavaService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/dogadjajs")
public class DogadjajController extends CrudController<Integer, DogadjajRequest, Dogadjaj> {

    private final DogadjajService service;
    private final ObjavaNaLovackiDnevnikService objavaService;

    public DogadjajController(DogadjajService service, ObjavaNaLovackiDnevnikService objavaService) {
        super(service, Dogadjaj.class);
        this.service = service;
        this.objavaService = objavaService;
    }

    @GetMapping("/objava/{objavaId}")
    public ResponseEntity<List<Dogadjaj>> getDogadjajiByObjava(@PathVariable Integer objavaId) {
        if (!objavaService.existsById(objavaId)) {
            return ResponseEntity.notFound().build(); // 404 ako objava ne postoji
        }

        List<Dogadjaj> dogadjaji = service.getDogadjajiByObjavaId(objavaId);
        return ResponseEntity.ok(dogadjaji); // 200 i [] ako nema dogadjaja
    }
}
