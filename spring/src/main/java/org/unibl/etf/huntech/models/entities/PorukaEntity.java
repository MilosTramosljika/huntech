package org.unibl.etf.huntech.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.base.BaseEntity;

import java.time.Instant;

@Data
@Entity
@Table(name = "poruka")
public class PorukaEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdPoruke", nullable = false)
    private Integer id;

    @Column(name = "Sadrzaj", nullable = false, length = 500)
    private String sadrzaj;

    @Column(name = "DatumSlanja", nullable = false)
    private Instant datumSlanja;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "IdKorisnika", nullable = false)
    @JsonIgnore
    private KorisnikEntity idKorisnika;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "IdKonverzacije", nullable = false)
    @JsonIgnore
    private KonverzacijaEntity idKonverzacije;

}