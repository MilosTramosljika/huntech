package org.unibl.etf.huntech.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.AktivnostDivljaci;
import org.unibl.etf.huntech.models.requests.AktivnostDivljaciRequest;
import org.unibl.etf.huntech.services.AktivnostDivljaciService;


@RestController
@RequestMapping("/aktivnost-divljacis")
public class AktivnostDivljaciController
        extends CrudController<Integer, AktivnostDivljaciRequest, AktivnostDivljaci> {

    public AktivnostDivljaciController(AktivnostDivljaciService service) {
        super(service, AktivnostDivljaci.class);
    }
}
