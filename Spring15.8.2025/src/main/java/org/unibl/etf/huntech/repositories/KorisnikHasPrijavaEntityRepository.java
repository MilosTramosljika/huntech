package org.unibl.etf.huntech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.unibl.etf.huntech.models.entities.KorisnikHasPrijavaEntity;

public interface KorisnikHasPrijavaEntityRepository
        extends JpaRepository<KorisnikHasPrijavaEntity, Integer> {

}
