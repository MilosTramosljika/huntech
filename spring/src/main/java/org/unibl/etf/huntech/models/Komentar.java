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
    private ObjavaEntity idObjave;
    private String sadrzaj;
    private KorisnikEntity idKorisnika;
    private Set<PodkomentarEntity> podkomentars = new LinkedHashSet<>();
}
