package org.unibl.etf.huntech.models;


import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.ObjavaEntity;

@Data
public class SlikaZaObjavu {

    private Integer id;
    private Integer idObjave;
    private String slika;
}
