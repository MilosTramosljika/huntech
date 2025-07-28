package org.unibl.etf.huntech.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.KHasZzp;
import org.unibl.etf.huntech.models.requests.KHasZzpRequest;
import org.unibl.etf.huntech.services.KHasZzpService;


@RestController
@RequestMapping("/k-zzps")
public class KHasZzpController extends CrudController<Integer, KHasZzpRequest, KHasZzp> {

    public KHasZzpController(KHasZzpService service) {
        super(service, KHasZzp.class);
    }
}
