package org.unibl.etf.huntech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.unibl.etf.huntech.models.entities.PodkomentarEntity;
import java.util.List;

public interface PodkomentarEntityRepository extends JpaRepository<PodkomentarEntity, Integer> {
    List<PodkomentarEntity> findPodkomentarByIdKomentara_Id(Integer id);
}
