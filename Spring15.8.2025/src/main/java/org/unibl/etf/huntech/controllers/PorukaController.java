package org.unibl.etf.huntech.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.exceptions.NotFoundException;
import org.unibl.etf.huntech.models.Poruka;
import org.unibl.etf.huntech.models.requests.PorukaRequest;
import org.unibl.etf.huntech.services.PorukaService;

import java.util.List;

@RestController
@RequestMapping("/porukas")
public class PorukaController extends CrudController<Integer, PorukaRequest, Poruka> {

    public PorukaController(PorukaService porukaService) {
        super(porukaService, Poruka.class);
    }
}

