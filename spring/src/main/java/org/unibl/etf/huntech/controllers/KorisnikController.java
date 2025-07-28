package org.unibl.etf.huntech.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.Korisnik;
import org.unibl.etf.huntech.models.requests.KorisnikRequest;
import org.unibl.etf.huntech.services.KorisnikService;

@RestController
@RequestMapping("/korisniks")
public class KorisnikController extends CrudController<Integer, KorisnikRequest, Korisnik> {


    public KorisnikController(KorisnikService service) {
        super(service, Korisnik.class);
    }

}


//swagger uzima endpointe i pravi dokumentaciju na osnovu njih
