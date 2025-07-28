package org.unibl.etf.huntech.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.base.BaseEntity;

@Data
@Entity
@Table(
        name = "korisnik_has_konverzacija",
        uniqueConstraints = @UniqueConstraint(columnNames = {"IdKorisnika", "IdKonverzacije"})
)
public class KorisnikHasKonverzacijaEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdKHK", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdKorisnika", nullable = false)
    private KorisnikEntity idKorisnika;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdKonverzacije", nullable = false)
    private KonverzacijaEntity idKonverzacije;

}