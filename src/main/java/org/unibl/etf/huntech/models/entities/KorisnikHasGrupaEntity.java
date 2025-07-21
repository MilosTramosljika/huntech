package org.unibl.etf.huntech.models.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "korisnik_has_grupa")
public class KorisnikHasGrupaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdKHG", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdKorisnika", nullable = false)
    private KorisnikEntity idKorisnika;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdGrupe", nullable = false)
    private GrupaEntity idGrupe;

    @Lob
    @Column(name = "StatusZaClanstvo", nullable = false)
    private String statusZaClanstvo;

    @Column(name = "DatumUclanjivanja")
    private LocalDate datumUclanjivanja;

    @Lob
    @Column(name = "TipZahtjeva", nullable = false)
    private String tipZahtjeva;

}