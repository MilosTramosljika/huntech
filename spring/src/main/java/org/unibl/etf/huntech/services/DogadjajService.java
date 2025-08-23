package org.unibl.etf.huntech.services;

import org.unibl.etf.huntech.base.CrudService;
import org.unibl.etf.huntech.models.Dogadjaj;
import org.unibl.etf.huntech.models.entities.DogadjajEntity;
import org.unibl.etf.huntech.repositories.GrupaEntityRepository;

import java.util.List;
import java.util.Optional;

public interface DogadjajService extends CrudService<Integer> {
    public List<Dogadjaj> getDogadjajiByObjavaId(Integer objavaId);

}