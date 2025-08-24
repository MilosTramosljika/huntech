package org.unibl.etf.huntech.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.unibl.etf.huntech.base.BaseEntity;

@Data
@Entity
@Table(
        name = "korisnik_has_prijava",
        uniqueConstraints = @UniqueConstraint(columnNames = {"IdKorisnika", "IdPrijave"})
)
public class KorisnikHasPrijavaEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdKHP", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdKorisnika", nullable = false)
    private KorisnikEntity idKorisnika;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdPrijave", nullable = false)
    private PrijavaEntity idPrijave;

}