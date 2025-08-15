package org.unibl.etf.huntech.controllers;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.unibl.etf.huntech.base.CrudController;
import org.unibl.etf.huntech.models.Objava;
import org.unibl.etf.huntech.models.requests.ObjavaRequest;
import org.unibl.etf.huntech.services.ObjavaService;

@RestController
@RequestMapping("/objavas")
public class ObjavaController extends CrudController<Integer, ObjavaRequest, Objava> {

    public ObjavaController(ObjavaService service) {
        super(service, Objava.class);
    }
}
