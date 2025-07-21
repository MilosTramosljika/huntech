package org.unibl.etf.huntech.models.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "korisnik_has_uloga")
public class KorisnikHasUlogaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "KORISNIK_HAS_ULOGAcol", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdKorisnika", nullable = false)
    private KorisnikEntity idKorisnika;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdUloge", nullable = false)
    private UlogaEntity idUloge;

    @Column(name = "DatumDobijanjaUloge", nullable = false)
    private LocalDate datumDobijanjaUloge;

    @Column(name = "IdKHU", length = 45)
    private String idKHU;

}