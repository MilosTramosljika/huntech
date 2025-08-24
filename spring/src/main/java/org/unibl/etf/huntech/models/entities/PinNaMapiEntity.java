package org.unibl.etf.huntech.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.unibl.etf.huntech.base.BaseEntity;
import org.unibl.etf.huntech.models.enums.TipPina;

import java.math.BigDecimal;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Getter
@Setter
@Entity
@Table(name = "pin_na_mapi")
public class PinNaMapiEntity implements BaseEntity<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdPinaNaMapi", nullable = false)
    private Integer id;

    @NotNull
    @Column(name = "Latitude", nullable = false, precision = 9, scale = 6)
    private BigDecimal latitude;

    @NotNull
    @Column(name = "Longitude", nullable = false, precision = 9, scale = 6)
    private BigDecimal longitude;

    @NotNull
    //@Lob
    @Enumerated(EnumType.STRING)
    @Column(name = "TipPina", nullable = false)
    private TipPina tipPina;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "IdGrupe", nullable = false)
    private GrupaEntity idGrupe;

}