package org.unibl.etf.huntech.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.Konverzacija;
import org.unibl.etf.huntech.models.requests.KonverzacijaRequest;
import org.unibl.etf.huntech.services.KonverzacijaService;


@RestController
@RequestMapping("/konverzacijas")
public class KonverzacijaController extends CrudController<Integer, KonverzacijaRequest, Konverzacija> {

    public KonverzacijaController(KonverzacijaService service) {
        super(service, Konverzacija.class);
    }
}
