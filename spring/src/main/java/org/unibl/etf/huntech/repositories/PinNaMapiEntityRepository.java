package org.unibl.etf.huntech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.unibl.etf.huntech.models.entities.ObjavaNaLovackiDnevnikEntity;
import org.unibl.etf.huntech.models.entities.PinNaMapiEntity;

import java.util.List;

public interface PinNaMapiEntityRepository extends JpaRepository<PinNaMapiEntity, Integer> {
    List<PinNaMapiEntity> findPinNaMapiByIdGrupe_Id(Integer id);
}
