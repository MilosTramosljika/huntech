package org.unibl.etf.huntech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.unibl.etf.huntech.models.ObjavaNaLovackiDnevnik;
import org.unibl.etf.huntech.models.entities.ObjavaNaLovackiDnevnikEntity;

import java.util.List;

public interface ObjavaNaLovackiDnevnikEntityRepository
        extends JpaRepository<ObjavaNaLovackiDnevnikEntity, Integer> {

    List<ObjavaNaLovackiDnevnikEntity> findByIdKorisnika_Id(Integer idKorisnika);
}
