package org.unibl.etf.huntech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.unibl.etf.huntech.models.entities.KomentarEntity;
import java.util.List;

public interface KomentarEntityRepository extends JpaRepository<KomentarEntity, Integer> {
    List<KomentarEntity> findKomentarByIdObjave_Id(Integer id);
}
