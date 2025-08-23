package org.unibl.etf.huntech.services;

import org.unibl.etf.huntech.base.CrudService;
import org.unibl.etf.huntech.models.Komentar;
import org.unibl.etf.huntech.models.PinNaMapi;
import org.unibl.etf.huntech.models.SlikaZaObjavu;

import java.util.List;

public interface KomentarService extends CrudService<Integer> {
    public List<Komentar> getKomentarByObjavaId(Integer objavaId);

}