package org.unibl.etf.huntech.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.base.BaseEntity;

@Data
@Entity
@Table(name = "obavjestenja")
public class ObavjestenjaEntity implements BaseEntity<Integer> {
    @Id
    @Column(name = "IdObavjestenja", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdKorisnika", nullable = false)
    private KorisnikEntity idKorisnika;

    @Lob
    @Column(name = "TipObavjestenja")
    private String tipObavjestenja;

    @Column(name = "Sadrzaj", length = 500)
    private String sadrzaj;

}