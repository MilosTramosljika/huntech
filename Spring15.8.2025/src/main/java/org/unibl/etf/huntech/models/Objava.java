package org.unibl.etf.huntech.models;


import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.GrupaEntity;
import org.unibl.etf.huntech.models.entities.KomentarEntity;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;
import org.unibl.etf.huntech.models.entities.SlikaZaObjavuEntity;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
public class Objava {

    private Integer id;
    private GrupaEntity idGrupe;
    private KorisnikEntity idKorisnika;
    private String tipObjave;
    private LocalDate datumObjavljivanja;
    private Integer lajk;
    private Integer dislajk;
    private Set<KomentarEntity> komentars = new LinkedHashSet<>();
    private Set<SlikaZaObjavuEntity> slikaZaObjavus = new LinkedHashSet<>();


}
