package org.unibl.etf.huntech.controllers;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.Lokacija;
import org.unibl.etf.huntech.models.requests.LokacijaRequest;
import org.unibl.etf.huntech.services.LokacijaService;

@RestController
@RequestMapping("/lokacijas")
public class LokacijaController extends CrudController<Integer, LokacijaRequest, Lokacija> {

    public LokacijaController(LokacijaService service){
        super(service, Lokacija.class);
    }
}
