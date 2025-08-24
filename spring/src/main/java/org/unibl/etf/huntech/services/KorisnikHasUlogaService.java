package org.unibl.etf.huntech.services;

import org.unibl.etf.huntech.base.CrudService;
import org.unibl.etf.huntech.models.KorisnikHasUloga;

import java.util.List;

public interface KorisnikHasUlogaService extends CrudService<Integer> {
    List<KorisnikHasUloga> getKorisnikHasUlogaByIdKorisnika(Integer korisnik_id);
}
