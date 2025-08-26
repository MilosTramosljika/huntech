package org.unibl.etf.huntech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.unibl.etf.huntech.models.entities.DogadjajEntity;
import org.unibl.etf.huntech.models.entities.ObjavaEntity;

import java.util.List;

public interface ObjavaEntityRepository extends JpaRepository<ObjavaEntity, Integer> {
    List<ObjavaEntity> findObjavaByIdGrupe_Id(Integer idGrupe);
}
