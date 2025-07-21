package org.unibl.etf.huntech.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Table(name = "podkomentar")
public class PodkomentarEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdPodkomentara", nullable = false)
    private Integer id;

    @Column(name = "Sadrzaj", nullable = false, length = 400)
    private String sadrzaj;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdKomentara", nullable = false)
    private KomentarEntity idKomentara;

}