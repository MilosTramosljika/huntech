package org.unibl.etf.huntech.models.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.unibl.etf.huntech.base.BaseEntity;

import java.util.LinkedHashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "zona_lova")
public class ZonaLovaEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdZoneLova", nullable = false)
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdGrupe", nullable = false)
    private GrupaEntity idGrupe;

    @OneToMany(mappedBy = "idZoneLova")
    private Set<PinNaMapiEntity> pinNaMapis = new LinkedHashSet<>();

}