package org.unibl.etf.huntech.models;

import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;
import org.unibl.etf.huntech.models.entities.KorisnikHasPrijavaEntity;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
public class Prijava {

    private Integer id;
    private KorisnikEntity idKorisnikaKojiPrijavljuje;
    private Instant datumPrijave;
    private String obrazlozenje;
    private String tipPrijave;
    private Set<KorisnikHasPrijavaEntity> korisnikHasPrijavas = new LinkedHashSet<>();

}
