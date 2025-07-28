package org.unibl.etf.huntech.models;


import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.GrupaEntity;

@Data
public class Lokacija {

    private Integer id;
    private GrupaEntity idGrupe;
    private Double geografskaSirina;
    private Double geografskaDuzina;
}
