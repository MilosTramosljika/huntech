package org.unibl.etf.huntech.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.base.BaseEntity;

import java.time.LocalDate;

@Data
@Entity
@Table(
        name = "korisnik_has_uloga",
        uniqueConstraints = @UniqueConstraint(columnNames = {"IdKorisnika", "IdUloge"})
)
public class KorisnikHasUlogaEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdKHU", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdKorisnika", nullable = false)
    private KorisnikEntity idKorisnika;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdUloge", nullable = false)
    private UlogaEntity idUloge;

    @Column(name = "DatumDobijanjaUloge", nullable = false)
    private LocalDate datumDobijanjaUloge;


}