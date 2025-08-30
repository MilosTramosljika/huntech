package org.unibl.etf.huntech.controllers;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.KorisnikHasPrijava;
import org.unibl.etf.huntech.models.requests.KorisnikHasPrijavaRequest;
import org.unibl.etf.huntech.services.KorisnikHasPrijavaService;

@RestController
@RequestMapping("/korisnik-prijavas")
public class KorisnikHasPrijavaController
        extends CrudController<Integer, KorisnikHasPrijavaRequest, KorisnikHasPrijava> {

    public KorisnikHasPrijavaController(KorisnikHasPrijavaService service) {
        super(service, KorisnikHasPrijava.class);
    }
}
