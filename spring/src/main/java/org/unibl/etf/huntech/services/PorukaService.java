package org.unibl.etf.huntech.services;

import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.base.CrudService;
import org.unibl.etf.huntech.exceptions.NotFoundException;
import org.unibl.etf.huntech.models.Poruka;
import org.unibl.etf.huntech.models.entities.PorukaEntity;

import java.util.List;

public interface PorukaService extends CrudService<Integer> {
   //List<Poruka> findAll();

    //Poruka findById(Integer id) throws NotFoundException;
}
