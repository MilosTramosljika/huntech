package org.unibl.etf.huntech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.unibl.etf.huntech.models.entities.SlikaZaObjavuNaLdEntity;

import java.util.List;

public interface SlikaZaObjavuNaLdEntityRepository extends JpaRepository<SlikaZaObjavuNaLdEntity, Integer> {
    public List<SlikaZaObjavuNaLdEntity> findByIdObjaveNaLD_Id(Integer  idObjaveNaLDId);
}
