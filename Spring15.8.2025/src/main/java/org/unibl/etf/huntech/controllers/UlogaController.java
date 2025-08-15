package org.unibl.etf.huntech.controllers;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.Uloga;
import org.unibl.etf.huntech.models.requests.UlogaRequest;
import org.unibl.etf.huntech.services.SlikaZaObjavuNaLdService;
import org.unibl.etf.huntech.services.UlogaService;


@RestController
@RequestMapping("/ulogas")
public class UlogaController extends CrudController<Integer, UlogaRequest, Uloga> {

    public UlogaController(UlogaService service) {
        super(service, Uloga.class);
    }
}
