package org.unibl.etf.huntech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.unibl.etf.huntech.models.entities.KorisnikHasGrupaEntity;
import org.unibl.etf.huntech.models.entities.KorisnikHasUlogaEntity;

import java.util.List;

public interface KorisnikHasGrupaEntityRepository
        extends JpaRepository<KorisnikHasGrupaEntity, Integer> {

    List<KorisnikHasGrupaEntity> findKorisnikHasGrupaByIdKorisnika_Id(Integer korisnik_id);


}
