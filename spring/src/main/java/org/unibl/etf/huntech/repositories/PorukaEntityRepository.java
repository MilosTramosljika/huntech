package org.unibl.etf.huntech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.unibl.etf.huntech.models.entities.PorukaEntity;

public interface PorukaEntityRepository extends JpaRepository<PorukaEntity, Integer> {


    //Boolean existsByName(String name);
    //Boolean existsByNameAndIdNot(String name, Integer id);
}
