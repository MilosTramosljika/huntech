package org.unibl.etf.huntech.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.base.BaseEntity;
import org.unibl.etf.huntech.models.enums.StatusZaClanstvo;
import org.unibl.etf.huntech.models.enums.TipZahtjeva;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@Entity
@Table(
        name = "korisnik_has_grupa",
        uniqueConstraints = @UniqueConstraint(columnNames = {"IdKorisnika", "IdGrupe"})
)

public class KorisnikHasGrupaEntity implements BaseEntity<Integer> {
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

    //@Lob
    @Enumerated(EnumType.STRING)
    @Column(name = "StatusZaClanstvo", nullable = false)
    private StatusZaClanstvo statusZaClanstvo;

    @Column(name = "DatumUclanjivanja")
    private LocalDate datumUclanjivanja;

    //@Lob
    @Enumerated
    @Column(name = "TipZahtjeva", nullable = false)
    private TipZahtjeva tipZahtjeva;

}