package org.unibl.etf.huntech.services;

import org.unibl.etf.huntech.base.CrudService;
import org.unibl.etf.huntech.models.Objava;

import java.util.List;

public interface ObjavaService extends CrudService<Integer> {
    public List<Objava> getObjaveByGrupaId(Integer grupaId);
}
