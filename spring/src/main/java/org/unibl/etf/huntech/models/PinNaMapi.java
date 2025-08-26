package org.unibl.etf.huntech.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.GrupaEntity;
import org.unibl.etf.huntech.models.entities.ZonaLovaEntity;

import java.math.BigDecimal;

@Data
public class PinNaMapi {
    private Integer id;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String tipPina;
    private Integer idGrupe;
    private Integer idZoneLova;
}
