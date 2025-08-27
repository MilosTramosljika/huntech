package org.unibl.etf.huntech.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.GrupaEntity;
import org.unibl.etf.huntech.models.entities.KomentarEntity;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;
import org.unibl.etf.huntech.models.entities.SlikaZaObjavuEntity;
import org.unibl.etf.huntech.models.enums.TipObjave;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
public class Objava {

    private Integer id;
    private Integer idGrupe;
    private Integer idKorisnika;
    private TipObjave tipObjave;
    private LocalDateTime datumObjavljivanja;
    private Integer lajk;
    private Integer dislajk;
    private String sadrzaj;
    private String nazivObjave;
//    private Set<KomentarEntity> komentars = new LinkedHashSet<>();
//    private Set<SlikaZaObjavuEntity> slikaZaObjavus = new LinkedHashSet<>();


}
