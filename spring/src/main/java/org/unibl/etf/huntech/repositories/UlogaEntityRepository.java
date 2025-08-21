package org.unibl.etf.huntech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.unibl.etf.huntech.models.entities.DogadjajEntity;
import org.unibl.etf.huntech.models.entities.UlogaEntity;

import java.util.List;

public interface UlogaEntityRepository extends JpaRepository<UlogaEntity, Integer> {
}
