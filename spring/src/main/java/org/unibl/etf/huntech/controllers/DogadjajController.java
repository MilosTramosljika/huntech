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
import org.unibl.etf.huntech.models.entities.DogadjajEntity;
import org.unibl.etf.huntech.models.requests.DogadjajRequest;
import org.unibl.etf.huntech.services.DogadjajService;
import org.unibl.etf.huntech.services.GrupaService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/dogadjajs")
public class DogadjajController extends CrudController<Integer, DogadjajRequest, Dogadjaj> {

    private final DogadjajService service;

    public DogadjajController(DogadjajService service) {
        super(service, Dogadjaj.class);
        this.service = service;
    }

    @GetMapping("/objava/{objavaId}")
    public ResponseEntity<List<Dogadjaj>> getDogadjajiByObjava(@PathVariable Integer objavaId) {
        List<Dogadjaj> dogadjaji = service.getDogadjajiByObjavaId(objavaId);

        if (dogadjaji.isEmpty()) {
            return ResponseEntity.notFound().build(); // 404
        }

        return ResponseEntity.ok(dogadjaji); // 200 + lista
    }
}
