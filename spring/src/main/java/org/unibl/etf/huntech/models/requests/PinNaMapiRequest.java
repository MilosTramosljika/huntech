package org.unibl.etf.huntech.models.requests;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PinNaMapiRequest {
    private Integer id;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String tipPina;
    private Integer idGrupe;
    private Integer idZoneLova;
}
