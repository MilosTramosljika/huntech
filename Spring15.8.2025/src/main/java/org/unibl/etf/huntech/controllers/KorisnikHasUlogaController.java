package org.unibl.etf.huntech.controllers;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.KorisnikHasUloga;
import org.unibl.etf.huntech.models.requests.KorisnikHasUlogaRequest;
import org.unibl.etf.huntech.services.KorisnikHasUlogaService;

@RestController
@RequestMapping("/korisnikhasulogas")
public class KorisnikHasUlogaController extends CrudController<Integer,
        KorisnikHasUlogaRequest, KorisnikHasUloga> {

    public KorisnikHasUlogaController(KorisnikHasUlogaService service){
        super(service, KorisnikHasUloga.class);
    }

}
