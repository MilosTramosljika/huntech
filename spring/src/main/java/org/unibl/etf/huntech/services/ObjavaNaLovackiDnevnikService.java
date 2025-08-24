package org.unibl.etf.huntech.services;

import org.unibl.etf.huntech.base.CrudService;
import org.unibl.etf.huntech.controllers.ObjavaNaLovackiDnevnikController;
import org.unibl.etf.huntech.models.ObjavaNaLovackiDnevnik;
import org.unibl.etf.huntech.models.entities.DogadjajEntity;
import org.unibl.etf.huntech.models.entities.ObjavaNaLovackiDnevnikEntity;

import java.util.List;

public interface ObjavaNaLovackiDnevnikService extends CrudService<Integer> {
    public List<ObjavaNaLovackiDnevnik> getObjaveNaLovackomDnevnikuByKorisnikId(Integer korisnikId);
}
