package org.unibl.etf.huntech.models;

import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.KorisnikHasKonverzacijaEntity;
import org.unibl.etf.huntech.models.entities.PorukaEntity;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
public class Konverzacija {


    private Integer id;
    private String nazivKonverzacije;
    private Instant datumKreiranja;
    private Set<KorisnikHasKonverzacijaEntity> korisnikHasKonverzacijas = new LinkedHashSet<>();
    private Set<PorukaEntity> porukas = new LinkedHashSet<>();

}
