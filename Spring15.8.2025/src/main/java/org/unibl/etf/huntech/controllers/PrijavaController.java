package org.unibl.etf.huntech.controllers;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.Prijava;
import org.unibl.etf.huntech.models.requests.PrijavaRequest;
import org.unibl.etf.huntech.services.PrijavaService;

@RestController
@RequestMapping("/prijavas")
public class PrijavaController extends CrudController<Integer, PrijavaRequest, Prijava> {

    public PrijavaController(PrijavaService service) {
        super(service, Prijava.class);
    }
}
