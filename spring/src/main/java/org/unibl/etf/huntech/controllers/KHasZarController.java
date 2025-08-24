package org.unibl.etf.huntech.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.KHasZar;
import org.unibl.etf.huntech.models.requests.KHasZarRequest;
import org.unibl.etf.huntech.services.KHasZarService;

@RestController
@RequestMapping("/k-zars")
public class KHasZarController extends CrudController<Integer, KHasZarRequest, KHasZar> {

    public KHasZarController(KHasZarService service) {
        super(service, KHasZar.class);
    }
}
