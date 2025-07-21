package org.unibl.etf.huntech.models.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.LinkedHashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "zahtjev_za_registraciju")
public class ZahtjevZaRegistracijuEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdZahtjeva", nullable = false)
    private Integer id;

    @Column(name = "urlPdfDokumenta", length = 45)
    private String urlPdfDokumenta;

    @OneToMany(mappedBy = "idZahtjeva")
    private Set<KHasZarEntity> kHasZars = new LinkedHashSet<>();

}