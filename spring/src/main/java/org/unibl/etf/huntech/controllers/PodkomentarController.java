package org.unibl.etf.huntech.controllers;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.requests.PodkomentarRequest;
import org.unibl.etf.huntech.models.Podkomentar;
import org.unibl.etf.huntech.services.PodkomentarService;

@RestController
@RequestMapping("/podkomentars")
public class PodkomentarController extends CrudController<Integer, PodkomentarRequest, Podkomentar> {

    public PodkomentarController(PodkomentarService service) {
        super(service, Podkomentar.class);
    }
}
