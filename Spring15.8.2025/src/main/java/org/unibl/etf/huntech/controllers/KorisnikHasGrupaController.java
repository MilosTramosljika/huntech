package org.unibl.etf.huntech.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.KorisnikHasGrupa;
import org.unibl.etf.huntech.models.requests.KorisnikHasGrupaRequest;
import org.unibl.etf.huntech.services.KorisnikService;


@RestController
@RequestMapping("korisnik-grupas")
public class KorisnikHasGrupaController extends CrudController<Integer, KorisnikHasGrupaRequest, KorisnikHasGrupa> {

    public KorisnikHasGrupaController(KorisnikService service) {
        super(service, KorisnikHasGrupa.class);
    }
}
