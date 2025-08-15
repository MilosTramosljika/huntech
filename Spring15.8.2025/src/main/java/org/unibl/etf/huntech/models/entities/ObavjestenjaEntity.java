package org.unibl.etf.huntech.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.base.BaseEntity;
import org.unibl.etf.huntech.models.enums.TipObavjestenja;

@Data
@Entity
@Table(name = "obavjestenja")
public class ObavjestenjaEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //dodao ZDRAVKO
    @Column(name = "IdObavjestenja", nullable = false)
    private Integer id;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdKorisnika", nullable = false)
    private KorisnikEntity idKorisnika;

    @Enumerated(EnumType.STRING)
    @Column(name = "TipObavjestenja")
    private TipObavjestenja tipObavjestenja;

    @Column(name = "Sadrzaj", length = 500)
    private String sadrzaj;

}


