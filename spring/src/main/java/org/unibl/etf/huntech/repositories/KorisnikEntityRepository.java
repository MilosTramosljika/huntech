package org.unibl.etf.huntech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;

import java.util.Optional;

public interface KorisnikEntityRepository extends JpaRepository<KorisnikEntity, Integer> {

    //OVE 2 SU SA LABA IZ INFORMACIONIH
    Boolean existsByIme(String name);
    Boolean existsByImeAndIdNot(String name, Integer id);

    Optional<KorisnikEntity> findByUsername(String korisnickoIme);
    Optional<KorisnikEntity> findByMail(String email);



}
