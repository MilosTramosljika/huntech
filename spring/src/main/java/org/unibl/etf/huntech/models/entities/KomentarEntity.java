package org.unibl.etf.huntech.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.base.BaseEntity;

import java.util.LinkedHashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "komentar")
public class KomentarEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdKomentara", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdObjave", nullable = false)
    private ObjavaEntity idObjave;

    @Column(name = "Sadrzaj", length = 400)
    private String sadrzaj;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdKorisnika", nullable = false)
    private KorisnikEntity idKorisnika;

    @OneToMany(mappedBy = "idKomentara")
    @JsonIgnore
    private Set<PodkomentarEntity> podkomentars = new LinkedHashSet<>();

}