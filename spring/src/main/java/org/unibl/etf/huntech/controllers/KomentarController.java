package org.unibl.etf.huntech.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.KHasZzp;
import org.unibl.etf.huntech.models.Komentar;
import org.unibl.etf.huntech.models.requests.KHasZzpRequest;
import org.unibl.etf.huntech.models.requests.KomentarRequest;
import org.unibl.etf.huntech.services.KomentarService;


@RestController
@RequestMapping("/komentars")
public class KomentarController extends CrudController<Integer, KomentarRequest, Komentar> {

    public KomentarController(KomentarService service) {
        super(service, Komentar.class);
    }
}
