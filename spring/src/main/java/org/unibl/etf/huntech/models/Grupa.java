package org.unibl.etf.huntech.models;

import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.AktivnostDivljaciEntity;
import org.unibl.etf.huntech.models.entities.KorisnikHasGrupaEntity;
import org.unibl.etf.huntech.models.entities.LokacijaEntity;
import org.unibl.etf.huntech.models.entities.ObjavaEntity;

import java.util.LinkedHashSet;
import java.util.Set;

@Data
public class Grupa {


    private Integer id;
    private String nazivGrupe;
    private String opis;
    private byte[] slika;
//    private Set<AktivnostDivljaciEntity> aktivnostDivljacis = new LinkedHashSet<>();
//    private Set<KorisnikHasGrupaEntity> korisnikHasGrupas = new LinkedHashSet<>();
//    private Set<LokacijaEntity> lokacijas = new LinkedHashSet<>();
//    private Set<ObjavaEntity> objavas = new LinkedHashSet<>();
}
