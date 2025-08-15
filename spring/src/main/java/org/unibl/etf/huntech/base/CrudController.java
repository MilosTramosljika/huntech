package org.unibl.etf.huntech.base;


//da ne moramo pisati one 4 funkcije uvijek

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.unibl.etf.huntech.exceptions.NotFoundException;
import org.unibl.etf.huntech.models.entities.SlikaZaObjavuEntity;


import java.io.Serializable;
import java.util.List;

@Getter
public abstract class CrudController<ID extends Serializable, REQ, RESP> {

    private final Class<RESP> respClass;
    private final CrudService<ID> crudService;


    protected CrudController(CrudService<ID> crudService, Class<RESP> respClass) {
        this.crudService = crudService;
        this.respClass = respClass;
    }

    @GetMapping
    List<RESP> findAll() { return crudService.findAll(respClass);}

    @GetMapping("/{id}")
    public RESP findById(@PathVariable ID id)throws NotFoundException {
        return crudService.findById(id, respClass);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) //chat gpt
    public void delete(@PathVariable ID id) {
        crudService.delete(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public RESP insert(@RequestBody REQ object) throws NotFoundException {
        return crudService.insert(object, respClass);
    }

    @PutMapping("/{id}")
    public RESP update(@PathVariable ID id, @RequestBody REQ object) throws NotFoundException {
        System.out.println("Pozvan update za ID: " + id);
        System.out.println("Payload: " + object);
        return crudService.update(id, object, respClass);
    }

}
