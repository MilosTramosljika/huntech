package org.unibl.etf.huntech.services;

import org.unibl.etf.huntech.base.CrudService;
import org.unibl.etf.huntech.models.SlikaZaObjavu;
import org.unibl.etf.huntech.models.SlikaZaObjavuNaLd;

import java.util.List;

public interface SlikaZaObjavuNaLdService extends CrudService<Integer> {
    public List<SlikaZaObjavuNaLd> getSlikeZaObjavuNaLdByObjavaId(Integer  objavaId);
}
