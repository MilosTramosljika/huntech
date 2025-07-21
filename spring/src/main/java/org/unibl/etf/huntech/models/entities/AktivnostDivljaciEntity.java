package org.unibl.etf.huntech.models.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "aktivnost_divljaci")
public class AktivnostDivljaciEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdAktivnostiDivljaci", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdGrupe", nullable = false)
    private GrupaEntity idGrupe;

    @Lob
    @Column(name = "Tip", nullable = false)
    private String tip;

    @Column(name = "Putanja", nullable = false, length = 400)
    private String putanja;

}