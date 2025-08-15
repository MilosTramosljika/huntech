package org.unibl.etf.huntech.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.KHasZzp;
import org.unibl.etf.huntech.models.Komentar;
import org.unibl.etf.huntech.models.entities.KomentarEntity;
import org.unibl.etf.huntech.models.requests.KHasZzpRequest;
import org.unibl.etf.huntech.models.requests.KomentarRequest;
import org.unibl.etf.huntech.services.KomentarService;


@RestController
@RequestMapping("/komentars")
public class KomentarController extends CrudController<Integer, KomentarRequest, Komentar> {


    public KomentarController(KomentarService service, KomentarService service1) {
        super(service, Komentar.class);
    }

}
