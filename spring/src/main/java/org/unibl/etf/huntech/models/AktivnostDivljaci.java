package org.unibl.etf.huntech.models;

import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.GrupaEntity;

@Data
public class AktivnostDivljaci {

    private Integer id;
    private Integer idGrupe;
    private String tip;
    private String putanja;
}
