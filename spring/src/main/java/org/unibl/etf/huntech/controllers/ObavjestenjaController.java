package org.unibl.etf.huntech.controllers;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.Obavjestenja;
import org.unibl.etf.huntech.models.requests.ObavjestenjaRequest;
import org.unibl.etf.huntech.services.ObavjestenjaService;

@RestController
@RequestMapping("/obavjestenjas")
public class ObavjestenjaController extends CrudController<Integer, ObavjestenjaRequest, Obavjestenja> {


    public ObavjestenjaController(ObavjestenjaService service) {
        super(service, Obavjestenja.class);
    }

}
