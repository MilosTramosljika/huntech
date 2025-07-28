package org.unibl.etf.huntech.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.KorisnikHasKonverzacija;
import org.unibl.etf.huntech.models.requests.KorisnikHasKonverzacijaRequest;
import org.unibl.etf.huntech.services.KorisnikHasKonverzacijaService;


@RestController
@RequestMapping("korisnik-konverzacijas")
public class KorisnikHasKonverzacijaController
        extends CrudController<Integer, KorisnikHasKonverzacijaRequest, KorisnikHasKonverzacija> {

    public KorisnikHasKonverzacijaController(KorisnikHasKonverzacijaService service) {
        super(service, KorisnikHasKonverzacija.class);
    }
}
