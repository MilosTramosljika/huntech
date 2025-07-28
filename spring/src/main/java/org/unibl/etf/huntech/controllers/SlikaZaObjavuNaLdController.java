package org.unibl.etf.huntech.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.SlikaZaObjavuNaLd;
import org.unibl.etf.huntech.models.requests.SlikaZaObjavuNaLdRequest;
import org.unibl.etf.huntech.services.SlikaZaObjavuNaLdService;

@RestController
@RequestMapping("slikas-ld")
public class SlikaZaObjavuNaLdController extends CrudController<Integer, SlikaZaObjavuNaLdRequest, SlikaZaObjavuNaLd> {

    public SlikaZaObjavuNaLdController(SlikaZaObjavuNaLdService service) {
        super(service, SlikaZaObjavuNaLd.class);
    }
}
