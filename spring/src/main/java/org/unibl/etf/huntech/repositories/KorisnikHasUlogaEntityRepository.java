package org.unibl.etf.huntech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.unibl.etf.huntech.models.KorisnikHasUloga;
import org.unibl.etf.huntech.models.entities.KorisnikHasUlogaEntity;

import java.util.List;

public interface KorisnikHasUlogaEntityRepository extends JpaRepository<KorisnikHasUlogaEntity, Integer> {
    List<KorisnikHasUlogaEntity> findKorisnikHasUlogaByIdKorisnika_Id(Integer korisnik_id);
}
