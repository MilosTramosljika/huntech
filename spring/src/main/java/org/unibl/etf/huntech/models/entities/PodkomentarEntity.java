package org.unibl.etf.huntech.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.unibl.etf.huntech.base.BaseEntity;

@Data
@Entity
@Table(name = "podkomentar")
public class PodkomentarEntity implements BaseEntity<Integer> {

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