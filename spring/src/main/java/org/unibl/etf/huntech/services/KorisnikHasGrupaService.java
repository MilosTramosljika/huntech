package org.unibl.etf.huntech.services;

import org.unibl.etf.huntech.base.CrudService;
import org.unibl.etf.huntech.models.KorisnikHasGrupa;

import java.util.List;

public interface KorisnikHasGrupaService extends CrudService<Integer> {
    List<KorisnikHasGrupa> getKorisnikHasGrupaByIdKorisnika(Integer korisnik_id);
}
