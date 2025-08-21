package org.unibl.etf.huntech.controllers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.SlikaZaObjavuNaLd;
import org.unibl.etf.huntech.models.requests.SlikaZaObjavuNaLdRequest;
import org.unibl.etf.huntech.services.SlikaZaObjavuNaLdService;

import java.util.List;

@RestController
@RequestMapping("slikas-ld")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class SlikaZaObjavuNaLdController extends CrudController<Integer, SlikaZaObjavuNaLdRequest, SlikaZaObjavuNaLd> {

    private final SlikaZaObjavuNaLdService service;

    public SlikaZaObjavuNaLdController(SlikaZaObjavuNaLdService service) {
        super(service, SlikaZaObjavuNaLd.class);
        this.service = service;
    }

    @GetMapping("/objava/{objavaId}")
    public ResponseEntity<List<SlikaZaObjavuNaLd>> getSlikeZaObjavuNaLdByIdObjave(@PathVariable Integer objavaId) {
        List<SlikaZaObjavuNaLd> slike = service.getSlikeZaObjavuNaLdByObjavaId(objavaId);

        if (slike.isEmpty()) {
            return ResponseEntity.notFound().build(); // 404
        }

        return ResponseEntity.ok(slike); // 200 + lista
    }

}
