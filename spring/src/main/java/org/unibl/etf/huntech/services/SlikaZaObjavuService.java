package org.unibl.etf.huntech.services;

import org.unibl.etf.huntech.base.CrudJpaService;
import org.unibl.etf.huntech.base.CrudService;
import org.unibl.etf.huntech.models.PinNaMapi;
import org.unibl.etf.huntech.models.SlikaZaObjavu;
import org.unibl.etf.huntech.models.entities.SlikaZaObjavuEntity;

import java.util.List;


public interface SlikaZaObjavuService extends CrudService<Integer> {

    public List<SlikaZaObjavu> getSlikaZaObjavuByObjavaId(Integer objavaId);

    //metode koje su specificne za nas
}
