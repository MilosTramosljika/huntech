package org.unibl.etf.huntech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.unibl.etf.huntech.models.entities.ObavjestenjaEntity;

public interface ObavjestenjaEntityRepository extends JpaRepository<ObavjestenjaEntity, Integer> {

//    @Query("SELECT MAX(o.id) FROM ObavjestenjaEntity o")
//    Integer findMaxId();

}
