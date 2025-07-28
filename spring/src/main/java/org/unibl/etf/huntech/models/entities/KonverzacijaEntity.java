package org.unibl.etf.huntech.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.unibl.etf.huntech.base.BaseEntity;

import java.io.Serializable;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "konverzacija")
public class KonverzacijaEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdKonverzacije", nullable = false)
    private Integer id;

    @Column(name = "NazivKonverzacije", nullable = false, length = 500)
    private String nazivKonverzacije;

    @Column(name = "DatumKreiranja", nullable = false)
    private Instant datumKreiranja;

    @OneToMany(mappedBy = "idKonverzacije")
    private Set<KorisnikHasKonverzacijaEntity> korisnikHasKonverzacijas = new LinkedHashSet<>();

    @OneToMany(mappedBy = "idKonverzacije")
    private Set<PorukaEntity> porukas = new LinkedHashSet<>();

}