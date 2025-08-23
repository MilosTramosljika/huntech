package org.unibl.etf.huntech.models;


import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.KomentarEntity;

@Data
public class Podkomentar {


    private Integer id;
    private String sadrzaj;
    private Integer idKomentara;

}
