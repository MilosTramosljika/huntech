package org.unibl.etf.huntech.controllers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.Objava;
import org.unibl.etf.huntech.models.SlikaZaObjavuNaLd;
import org.unibl.etf.huntech.models.requests.SlikaZaObjavuNaLdRequest;
import org.unibl.etf.huntech.services.ObjavaNaLovackiDnevnikService;
import org.unibl.etf.huntech.services.ObjavaService;
import org.unibl.etf.huntech.services.SlikaZaObjavuNaLdService;

import java.util.List;

@RestController
@RequestMapping("slikas-ld")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class SlikaZaObjavuNaLdController extends CrudController<Integer, SlikaZaObjavuNaLdRequest, SlikaZaObjavuNaLd> {

    private final SlikaZaObjavuNaLdService service;
    private final ObjavaNaLovackiDnevnikService objavaService;

    public SlikaZaObjavuNaLdController(SlikaZaObjavuNaLdService service, ObjavaNaLovackiDnevnikService objavaService) {
        super(service, SlikaZaObjavuNaLd.class);
        this.service = service;
        this.objavaService = objavaService;
    }

    @GetMapping("/objava/{objavaId}")
    public ResponseEntity<List<SlikaZaObjavuNaLd>> getSlikeZaObjavuNaLdByIdObjave(@PathVariable Integer objavaId) {
        if (!objavaService.existsById(objavaId)) {
            return ResponseEntity.notFound().build();
        }

        List<SlikaZaObjavuNaLd> slike = service.getSlikeZaObjavuNaLdByObjavaId(objavaId);
        return ResponseEntity.ok(slike);
    }

}
