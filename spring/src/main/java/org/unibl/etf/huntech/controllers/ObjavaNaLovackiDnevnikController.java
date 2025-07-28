package org.unibl.etf.huntech.controllers;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.ObjavaNaLovackiDnevnik;
import org.unibl.etf.huntech.models.requests.ObjavaNaLovackiDnevnikRequest;
import org.unibl.etf.huntech.services.ObjavaNaLovackiDnevnikService;

@RestController
@RequestMapping("/objavas-ld")
public class ObjavaNaLovackiDnevnikController extends CrudController<Integer,
        ObjavaNaLovackiDnevnikRequest, ObjavaNaLovackiDnevnik> {

    public ObjavaNaLovackiDnevnikController(ObjavaNaLovackiDnevnikService service) {
        super(service, ObjavaNaLovackiDnevnik.class);
    }
}
