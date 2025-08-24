package org.unibl.etf.huntech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.unibl.etf.huntech.models.Dogadjaj;
import org.unibl.etf.huntech.models.entities.DogadjajEntity;
import org.unibl.etf.huntech.models.entities.GrupaEntity;

import java.util.List;
import java.util.Optional;

public interface DogadjajEntityRepository extends JpaRepository<DogadjajEntity, Integer> {
    List<DogadjajEntity> findByIdObjaveNaLD_Id(Integer idObjaveNaLDId);
}
