package org.unibl.etf.huntech.controllers;


import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.ZahtjevZaPromjenuStatusa;
import org.unibl.etf.huntech.models.requests.ZahtjevZaPromjenuStatusaRequest;
import org.unibl.etf.huntech.services.ZahtjevZaPromjenuStatusaService;

@RestController
@RequestMapping("zahtjevs-ps")
public class ZahtjevZaPromjenuStatusaController
        extends CrudController<Integer, ZahtjevZaPromjenuStatusaRequest, ZahtjevZaPromjenuStatusa> {

    public ZahtjevZaPromjenuStatusaController(ZahtjevZaPromjenuStatusaService service) {

        super(service, ZahtjevZaPromjenuStatusa.class);
    }
}
