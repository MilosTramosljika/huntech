package org.unibl.etf.huntech.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.base.BaseEntity;
import org.unibl.etf.huntech.models.enums.TipAktivnosti;

@Data
@Entity
@Table(name = "aktivnost_divljaci")
public class AktivnostDivljaciEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdAktivnostiDivljaci", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdGrupe", nullable = false)
    private GrupaEntity idGrupe;

    //@Lob
    @Enumerated(EnumType.STRING)
    @Column(name = "Tip", nullable = false)
    private TipAktivnosti tip;

    @Column(name = "Putanja", nullable = false, length = 400)
    private String putanja;

}