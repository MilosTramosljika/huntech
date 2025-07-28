package org.unibl.etf.huntech.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.base.BaseEntity;
import org.unibl.etf.huntech.models.enums.TipPrijave;

import java.io.Serializable;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "prijava")
public class PrijavaEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdPrijave", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdKorisnikaKojiPrijavljuje", nullable = false)
    private KorisnikEntity idKorisnikaKojiPrijavljuje;

    @Column(name = "DatumPrijave", nullable = false)
    private Instant datumPrijave;

    @Column(name = "Obrazlozenje", nullable = false, length = 500)
    private String obrazlozenje;

    //@Lob
    @Enumerated(EnumType.STRING)
    @Column(name = "TipPrijave")
    private TipPrijave tipPrijave;

    @OneToMany(mappedBy = "idPrijave")
    private Set<KorisnikHasPrijavaEntity> korisnikHasPrijavas = new LinkedHashSet<>();

}