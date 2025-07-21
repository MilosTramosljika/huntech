package org.unibl.etf.huntech.models.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;

@Data
@Entity
@Table(name = "slika_za_objavu_na_ld")
public class SlikaZaObjavuNaLdEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdSlikeZaObjavuNaLD", nullable = false)
    private Integer id;

    @Column(name = "Datum", nullable = false)
    private Instant datum;

    @Column(name = "Slika", nullable = false, length = 500)
    private String slika;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdObjaveNaLD", nullable = false)
    private ObjavaNaLovackiDnevnikEntity idObjaveNaLD;

}