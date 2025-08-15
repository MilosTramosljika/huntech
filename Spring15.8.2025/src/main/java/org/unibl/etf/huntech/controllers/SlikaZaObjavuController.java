package org.unibl.etf.huntech.controllers;


import org.springframework.web.bind.annotation.*;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.SlikaZaObjavu;
import org.unibl.etf.huntech.models.requests.SlikaZaObjavuRequest;
import org.unibl.etf.huntech.services.SlikaZaObjavuService;


@RestController
@RequestMapping("/slikas")
public class SlikaZaObjavuController extends CrudController<Integer, SlikaZaObjavuRequest, SlikaZaObjavu> {
    public SlikaZaObjavuController(SlikaZaObjavuService service) {
        super(service, SlikaZaObjavu.class);
    }
}
