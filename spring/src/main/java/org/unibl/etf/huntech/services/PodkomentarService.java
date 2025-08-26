package org.unibl.etf.huntech.services;

import org.unibl.etf.huntech.base.CrudService;
import org.unibl.etf.huntech.models.Podkomentar;

import java.util.List;

public interface PodkomentarService extends CrudService<Integer> {
    public List<Podkomentar> getPodkomentarByKomentarId(Integer  komentarId);
}
