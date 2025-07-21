package org.unibl.etf.huntech.models.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "zahtjev_za_promjenu_statusa")
public class ZahtjevZaPromjenuStatusaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdZahtjevaZaPromjenuStatusa", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "KORISNIK_IdKorisnika", nullable = false)
    private KorisnikEntity korisnikIdkorisnika;

    @Column(name = "Obrazlozenje", length = 400)
    private String obrazlozenje;

    @Column(name = "DatumPodnosenja", nullable = false)
    private LocalDate datumPodnosenja;

    @OneToMany(mappedBy = "idZahtjevaZaPromjenuStatusa")
    private Set<KHasZzpEntity> kHasZzps = new LinkedHashSet<>();

}