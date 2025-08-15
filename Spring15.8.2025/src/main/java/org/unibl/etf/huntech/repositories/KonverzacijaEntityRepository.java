package org.unibl.etf.huntech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.unibl.etf.huntech.models.Konverzacija;
import org.unibl.etf.huntech.models.entities.KonverzacijaEntity;

public interface KonverzacijaEntityRepository
        extends JpaRepository<KonverzacijaEntity, Integer> {


}
