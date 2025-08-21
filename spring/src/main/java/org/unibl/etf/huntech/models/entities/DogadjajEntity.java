package org.unibl.etf.huntech.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.unibl.etf.huntech.base.BaseEntity;

@Data
@Entity
@Table(name = "dogadjaj")
public class DogadjajEntity implements BaseEntity<Integer>{
    @Id
    @Column(name = "IdDogadjaja", nullable = false)
    private Integer id;

    @Size(max = 100)
    @Column(name = "Lokacija", length = 100)
    private String lokacija;

    @Size(max = 100)
    @Column(name = "VrstaDivljaci", length = 100)
    private String vrstaDivljaci;

    @Size(max = 100)
    @Column(name = "KoristenoOruzje", length = 100)
    private String koristenoOruzje;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdObjaveNaLD", nullable = false)
    private ObjavaNaLovackiDnevnikEntity idObjaveNaLD;

}