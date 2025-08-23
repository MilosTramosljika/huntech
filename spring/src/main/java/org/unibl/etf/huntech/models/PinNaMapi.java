package org.unibl.etf.huntech.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PinNaMapi {
    private Integer id;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String tipPina;
}
