package org.unibl.etf.huntech.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.ZahtjevZaRegistraciju;
import org.unibl.etf.huntech.models.requests.ZahtjevZaRegistracijuRequest;
import org.unibl.etf.huntech.services.ZahtjevZaRegistracijuService;

@RestController
@RequestMapping("/zahtjevs-reg")
public class ZahtjevZaRegistracijuController
        extends CrudController<Integer, ZahtjevZaRegistracijuRequest, ZahtjevZaRegistraciju> {

    public ZahtjevZaRegistracijuController(ZahtjevZaRegistracijuService service){
        super(service, ZahtjevZaRegistraciju.class);
    }
}
