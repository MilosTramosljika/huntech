package org.unibl.etf.huntech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.unibl.etf.huntech.models.entities.SlikaZaObjavuEntity;
import org.unibl.etf.huntech.models.entities.SlikaZaObjavuNaLdEntity;
import java.util.List;


public interface SlikaZaObjavuEntityRepository extends JpaRepository<SlikaZaObjavuEntity, Integer> {
    List<SlikaZaObjavuEntity> findSlikaZaObjavuByIdObjave_Id(Integer id);
}
