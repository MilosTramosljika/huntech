package org.unibl.etf.huntech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.unibl.etf.huntech.models.entities.DogadjajEntity;
import org.unibl.etf.huntech.models.entities.ZonaLovaEntity;

import java.util.List;

public interface ZonaLovaEntityRepository extends JpaRepository<ZonaLovaEntity, Integer> {
    List<ZonaLovaEntity> findByIdGrupe_Id(Integer idGrupe);

}
