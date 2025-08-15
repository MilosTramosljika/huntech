package org.unibl.etf.huntech.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.unibl.etf.huntech.base.BaseEntity;

@Data
@Entity
@Table(name = "slika_za_objavu")
public class SlikaZaObjavuEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdSlikeZaObjavu", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdObjave", nullable = false)
    private ObjavaEntity idObjave;

    @Column(name = "Slika", nullable = false, length = 500)
    private String slika;

}