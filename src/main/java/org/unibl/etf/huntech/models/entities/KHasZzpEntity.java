package org.unibl.etf.huntech.models.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "k_has_zzps")
public class KHasZzpEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdKHasZZPS", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdKorisnika", nullable = false)
    private KorisnikEntity idKorisnika;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdZahtjevaZaPromjenuStatusa", nullable = false)
    private ZahtjevZaPromjenuStatusaEntity idZahtjevaZaPromjenuStatusa;

    @Column(name = "DatumObrade")
    private LocalDate datumObrade;

}