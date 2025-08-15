package org.unibl.etf.huntech.models.requests;

import lombok.Data;
import org.unibl.etf.huntech.models.entities.GrupaEntity;

@Data
public class LokacijaRequest {

    private Integer idGrupe;
    private Double geografskaSirina;
    private Double geografskaDuzina;

}
