package org.unibl.etf.huntech.models;


import jakarta.persistence.*;
import lombok.Data;
import org.unibl.etf.huntech.models.entities.KorisnikEntity;
import org.unibl.etf.huntech.models.entities.ObjavaEntity;
import org.unibl.etf.huntech.models.entities.PodkomentarEntity;

import java.util.LinkedHashSet;
import java.util.Set;

@Data
public class Komentar {

    private Integer id;
    private Integer idObjave;
    private String sadrzaj;
    private Integer idKorisnika;

}
