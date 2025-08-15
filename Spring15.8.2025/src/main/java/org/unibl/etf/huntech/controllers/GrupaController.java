package org.unibl.etf.huntech.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.Grupa;
import org.unibl.etf.huntech.models.Komentar;
import org.unibl.etf.huntech.models.requests.GrupaRequest;
import org.unibl.etf.huntech.services.GrupaService;
import org.unibl.etf.huntech.services.KonverzacijaService;

@RestController
@RequestMapping("/grupas")
public class GrupaController extends CrudController<Integer, GrupaRequest, Grupa> {

    public GrupaController(GrupaService service) {
        super(service, Grupa.class);
    }
}
