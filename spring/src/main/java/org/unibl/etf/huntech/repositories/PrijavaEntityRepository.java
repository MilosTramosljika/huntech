package org.unibl.etf.huntech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.unibl.etf.huntech.models.entities.PorukaEntity;
import org.unibl.etf.huntech.models.entities.PrijavaEntity;

import java.util.List;

public interface PrijavaEntityRepository extends JpaRepository<PrijavaEntity, Integer> {

    //List<PrijavaEntity> findAllByIdKorisnikaKojiPrijavljuje_Id(Integer id);
}
