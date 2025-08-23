package org.unibl.etf.huntech.models;

import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.DogadjajEntity;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;
import org.unibl.etf.huntech.models.entities.SlikaZaObjavuNaLdEntity;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
public class ObjavaNaLovackiDnevnik {

    private Integer id;
    private Instant datum;
    private String sadrzaj;
    private Integer idKorisnika;

    //private Set<SlikaZaObjavuNaLdEntity> slikaZaObjavuNaLds = new LinkedHashSet<>();
}
