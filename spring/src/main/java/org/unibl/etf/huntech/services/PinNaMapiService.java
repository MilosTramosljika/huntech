package org.unibl.etf.huntech.services;

import org.unibl.etf.huntech.base.CrudService;
import org.unibl.etf.huntech.models.PinNaMapi;

import java.util.List;

public interface PinNaMapiService extends CrudService<Integer> {
    public List<PinNaMapi> getPinNaMapiByGrupaId(Integer objavaId);
}
