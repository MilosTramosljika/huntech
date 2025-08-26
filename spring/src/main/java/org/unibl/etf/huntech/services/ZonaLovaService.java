package org.unibl.etf.huntech.services;

import org.unibl.etf.huntech.base.CrudService;
import org.unibl.etf.huntech.models.Dogadjaj;
import org.unibl.etf.huntech.models.ZonaLova;

import java.util.List;

public interface ZonaLovaService extends CrudService<Integer> {
    public List<ZonaLova> getZonaLovaByIdGrupe(Integer IdGrupe);

}
