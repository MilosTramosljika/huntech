package org.unibl.etf.huntech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;

public interface KorisnikEntityRepository extends JpaRepository<KorisnikEntity, Integer> {

    Boolean existsByIme(String name);
    Boolean existsByImeAndIdNot(String name, Integer id);

}
